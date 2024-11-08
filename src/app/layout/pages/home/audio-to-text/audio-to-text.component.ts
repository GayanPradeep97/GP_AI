import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from 'src/app/_services/firebase.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConnectableObservable } from 'rxjs';
import { DataService } from 'src/app/_services/shared-data/data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-audio-to-text',
  templateUrl: './audio-to-text.component.html',
  styleUrls: ['./audio-to-text.component.sass'],
})
export class AudioToTextComponent {
  transcript: string = '';
  audioUrl: string | null = null;
  words: string[] = [];
  highlightedIndex: number = -1;
  audioElement: HTMLAudioElement | null = null;
  convertedText: string = '';
  convertedTexts: any[] = [];
  public audioForm: any = FormGroup;
  file: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private FirebaseService: FirebaseService,
    private dataService: DataService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit() {
    this.audioForm = this.formBuilder.group({
      audioFile: [''],
    });
    this.dataService.loggedUserId$.subscribe((userId) => {
      if (userId) {
        console.log('User ID available:', userId);
        this.loadConvertedTexts(); // Only call this once userId is available
      } else {
        console.log('No user logged in');
      }
    });
  }

  get audioFile() {
    return this.audioForm.get('audioFile');
  }

  handleFileInput(event: any) {
    this.file = event.target.files[0];
  }

  onFileSelected() {
    const file = this.file;
    console.log('values', file);
    // const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name); // Specify file name as the third argument

      // Send the file to the Flask backend
      this.http
        .post<{ text: string }>('http://localhost:5000/upload-audio', formData)
        .subscribe(
          (response) => {
            this.transcript = response.text;
            this.words = this.transcript.split(' '); // Split the transcript into words
            this.audioUrl = URL.createObjectURL(file); // Create an audio URL for playback
            this.initializeAudio(); // Initialize audio
            this.onAudioConverted(this.transcript);
            this.notificationService.create(
              'success',
              'Success',
              ' Successfully Converted',
              {
                nzStyle: { background: '#4CAF50', color: '#fff' },
              }
            );
          },
          (error) => {
            this.notificationService.create('error', 'Error', 'Conver Failed', {
              nzStyle: { background: '#dd1717', color: '#fff' },
            });
          }
        );
    } else {
      this.notificationService.create('error', 'Error', 'Please Input Audio', {
        nzStyle: { background: '#dd1717', color: '#fff' },
      });
    }
  }

  // Initialize the audio and set up time update listener
  initializeAudio() {
    if (this.audioUrl) {
      this.audioElement = new Audio(this.audioUrl);
      this.audioElement.load();
      this.audioElement.addEventListener(
        'timeupdate',
        this.onTimeUpdate.bind(this)
      );
      this.audioElement.addEventListener('ended', () => {
        this.highlightedIndex = -1; // Reset when the audio ends
      });
    }
  }

  // Track the time update of the audio
  onTimeUpdate() {
    if (this.audioElement) {
      const currentTime = this.audioElement.currentTime;
      const wordDuration = this.calculateWordDuration();
      const index = Math.floor(currentTime / wordDuration);

      // Ensure the index is within bounds
      if (index < this.words.length && index !== this.highlightedIndex) {
        this.highlightedIndex = index;
      }
    }
  }

  // Calculate the average duration for each word
  calculateWordDuration(): number {
    const totalWords = this.words.length;
    const totalAudioDuration = this.getAudioDuration();
    return totalAudioDuration / totalWords;
  }

  // Get the total duration of the audio
  getAudioDuration(): number {
    if (this.audioElement) {
      return this.audioElement.duration;
    }
    return 0;
  }

  // Copy the text to clipboard
  copyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = this.transcript;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  // Clear the fields
  clear() {
    this.transcript = '';
    this.audioUrl = null;
    this.words = [];
    this.highlightedIndex = -1;
    this.audioForm.get('audioFile').reset();
  }

  onAudioConverted(audioText: string) {
    this.convertedText = audioText;

    // Save converted text to Firestore under the logged-in user
    this.FirebaseService.saveConvertedText(this.convertedText).subscribe(() => {
      console.log('Converted text saved successfully!');
      this.loadConvertedTexts(); // Refresh the list
    });
  }

  // Method to load all converted texts from Firestore
  loadConvertedTexts() {
    console.log('Logged-in user ID:', this.dataService.loggedUserId); // Log UID // Log UID
    this.FirebaseService.getConvertedTexts().then((texts) => {
      this.convertedTexts = texts;
      console.log('exiasting converted', texts);
    });
  }

  deleteConvertedText(docId: string) {
    console.log('docId', docId);
    this.FirebaseService.deleteConvertedText(docId)
      .then(() => {
        // Update the local array to reflect deletion
        this.convertedTexts = this.convertedTexts.filter(
          (text) => text.id !== docId
        );
        this.notificationService.create(
          'success',
          'Success',
          'Text Deleted Successfully',
          {
            nzStyle: { background: '#4CAF50', color: '#fff' },
          }
        );
      })
      .catch((error) => {
        this.notificationService.create(
          'error',
          'Error',
          'Text Deleted Failed',
          {
            nzStyle: { background: '#dd1717', color: '#fff' },
          }
        );
      });
  }
}
