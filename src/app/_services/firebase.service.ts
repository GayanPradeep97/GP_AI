import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // Save the converted text to Firestore
  saveConvertedText(text: string): Observable<any> {
    const user = this.auth.currentUser;
    if (user) {
      const userId = user.uid; // Get the user's UID
      const collectionRef = collection(
        this.firestore,
        'users',
        userId,
        'convertedTexts'
      );
      return from(
        addDoc(collectionRef, {
          text: text,
          timestamp: new Date(),
        })
      );
    } else {
      throw new Error('User is not logged in');
    }
  }

  // Retrieve the saved converted texts from Firestore
  getConvertedTexts(): Promise<any[]> {
    const user = this.auth.currentUser;
    if (user) {
      const userId = user.uid; // Get the user's UID
      const collectionRef = collection(
        this.firestore,
        'users',
        userId,
        'convertedTexts'
      );
      return getDocs(collectionRef).then((snapshot) => {
        const texts = snapshot.docs.map((doc) => doc.data());
        return texts;
      });
    } else {
      throw new Error('User is not logged in');
    }
  }
}
