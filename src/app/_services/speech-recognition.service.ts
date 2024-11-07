import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechRecognitionService {
  private recognition: any;
  public isListening = false;

  constructor() {
    const { webkitSpeechRecognition }: any = window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US'; // Set the language
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
  }

  startListening(callback: (text: string) => void) {
    this.isListening = true;
    this.recognition.start();

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      callback(transcript);
    };

    this.recognition.onerror = (error: any) => {
      console.error('Recognition error:', error);
      this.stopListening();
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
  }
}
