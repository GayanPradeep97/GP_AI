import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from 'src/app/_services/firebase.service';
import { AuthService } from 'src/app/_services/auth.service';

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

  constructor(
    private http: HttpClient,
    private FirebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // When the component initializes, load the saved texts for the logged-in user
    if (this.authService.currentUserValue) {
      this.loadConvertedTexts();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
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
          },
          (error) => {
            console.error('Error uploading audio file:', error);
          }
        );
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
    this.FirebaseService.getConvertedTexts().then((texts) => {
      this.convertedTexts = texts;
    });
  }

  // Call this method to simulate the audio-to-text conversion and saving
}
