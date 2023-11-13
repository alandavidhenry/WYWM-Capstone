import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fs: Firestore) {}

  getData(db: string): Observable<any[]> {
    const collectionInstance = collection(this.fs, db);
    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      catchError(error => {
        console.error('Error fetching data: ', error);
        throw error;
      })
    );
  }

  addData(data: any, db: string): Promise<void> {
    const collectionInstance = collection(this.fs, db);
    return addDoc(collectionInstance, data).then(() => {
      console.log('Data saved successfully');
    })
    .catch((err) => {
      console.error('Error adding data: ', err);
      throw err;
    });
  }

  updateData(id: string, updateData: any, db: string): Promise<void> {
    const docInstance = doc(this.fs, db, id);
    return updateDoc(docInstance, updateData).then(() => {
      console.log('Data updated');
    })
    .catch((err) => {
      console.error('Error updating data: ', err);
      throw err;
    });
  }

  deleteData(id: string, db: string): Promise<void> {
    const docInstance = doc(this.fs, db, id);
    return deleteDoc(docInstance).then(() => {
      console.log('Data deleted');
    })
    .catch((err) => {
      console.error('Error deleting data: ', err);
      throw err;
    });
  }
}
