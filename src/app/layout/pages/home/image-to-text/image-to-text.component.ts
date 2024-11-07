import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import * as Tesseract from 'tesseract.js';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    darkMode: any;
  }
}

@Component({
  selector: 'app-image-to-text',
  templateUrl: './image-to-text.component.html',
  styleUrls: ['./image-to-text.component.sass'],
})
export class ImageToTextComponent {
  selectedImage: File | null = null;
  extractedText: string = '';
  imagePreview: string | ArrayBuffer | null = null; // Holds the preview URL
  isLoading: boolean = false; // Loader status

  constructor(private notificationServise: NzNotificationService) {}
  ngOnInit() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];

      // Generate a preview URL for the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  convertImageToText(): void {
    if (!this.selectedImage) return;

    this.isLoading = true; // Show loader

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;

      Tesseract.recognize(imageData, 'eng', {})
        .then(({ data: { text } }: any) => {
          this.extractedText = text;
          this.isLoading = false; // Hide loader when done
        })
        .catch((error: any) => {
          this.notificationServise.create('error', 'Error', error, {
            nzStyle: { background: '#cc2d2d', color: '#fff' },
          });
          this.isLoading = false; // Hide loader on error
        });
    };

    reader.readAsDataURL(this.selectedImage);
  }

  clearImageAndText(): void {
    this.selectedImage = null;
    this.extractedText = '';
    this.imagePreview = null;
    this.isLoading = false; // Hide loader if it was active
  }

  toggleDarkMode() {
    window.darkMode.toggle().then((isDarkMode: boolean) => {
      console.log('Dark mode is now', isDarkMode ? 'enabled' : 'disabled');
    });
  }

  useSystemTheme() {
    window.darkMode.system().then(() => {
      console.log('System theme applied');
    });
  }
}
