import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
} from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { DataService } from './shared-data/data.service';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private currentUserId: string | null = null;

  loggedUser!: boolean;
  useId: any;
  constructor(private dataService: DataService) {
    this.dataService.loggedUserId$.subscribe((userId) => {
      this.currentUserId = userId;
      console.log('Current User ID in FirebaseService:', this.currentUserId);
    });
  }

  // Save the converted text to Firestore
  saveConvertedText(text: string): Observable<any> {
    if (this.currentUserId) {
      const collectionRef = collection(
        this.firestore,
        'users',
        this.currentUserId,
        'convertedTexts'
      );

      return from(
        addDoc(collectionRef, {
          text: text,
          timestamp: new Date(),
        }).then((docRef) => {
          // Update the document with the generated ID
          return updateDoc(docRef, { id: docRef.id }).then(() => ({
            id: docRef.id,
            text: text,
            timestamp: new Date(),
          }));
        })
      );
    } else {
      throw new Error('User is not logged in');
    }
  }

  // Retrieve the saved converted texts from Firestore
  getConvertedTexts(): Promise<any[]> {
    if (this.currentUserId) {
      const collectionRef = collection(
        this.firestore,
        'users',
        this.currentUserId,
        'convertedTexts'
      );
      return getDocs(collectionRef).then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });
    } else {
      throw new Error('User is not logged in');
    }
  }

  deleteConvertedText(docId: string): Promise<void> {
    const user = this.auth.currentUser;
    if (this.currentUserId) {
      const collectionRef = doc(
        this.firestore,
        'users',
        this.currentUserId,
        'convertedTexts',
        docId
      );
      return deleteDoc(collectionRef).then(() => {
        console.log(`Document with ID ${docId} deleted successfully.`);
      });
    } else {
      return Promise.reject('User is not logged in');
    }
  }
}
