import { Injectable } from '@angular/core';
import { 
  addDoc, collection,
  deleteDoc,
  doc, getDoc, getDocs,
  getFirestore, onSnapshot,
   orderBy, query, updateDoc, where 
} from "firebase/firestore"; 
import { getStorage, ref, uploadString } from 'firebase/storage';
import { of } from 'rxjs';
import { FileModel } from '../models/fileModel';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  
  private readonly collectionPath:string = "files";
  private fileCollection = collection(getFirestore(),this.collectionPath);

  constructor() { }

  
  async getByFileUser(userId:string){
    const getQuery = query(this.fileCollection,where("userId","==",userId));    
    return of(await getDocs(getQuery));
  }

  async getAll(){
    const getData = await getDocs(this.fileCollection);
    return of(getData);
  }

  
  async add(fileModel:FileModel){
    const addOperation = await addDoc(this.fileCollection, {
      id:fileModel.id,
      name:fileModel.name,
      uploadDate:fileModel.uploadDate,
      userId:fileModel.userId,
      file:fileModel.file
    });
    return of(addOperation);
  }


  async update(fileModel:FileModel){
    const fileDocRef = doc(getFirestore(), this.collectionPath, fileModel.id == null ? fileModel.userId : fileModel.id);
    const updateOperation = await updateDoc(fileDocRef,{
      name:fileModel.name,
      uploadDate:fileModel.uploadDate,      
      userId:fileModel.userId,
      file:fileModel.file
    });
    return of(updateOperation);
  }



}
