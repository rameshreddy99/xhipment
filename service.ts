import { Injectable } from '@angular/core';
import { Post } from './post';
import { collectionData, deleteDoc, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, doc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private fs:Firestore) { }
  addPost(post:Post){
    post.id=doc(collection(this.fs, 'id')).id
    return addDoc(collection(this.fs, 'Posts'),post)
  }
  getPosts():Observable<Post[]>{
    let postRef=collection(this.fs,'Posts')
    return collectionData(postRef,{idField:'id'}) as Observable<Post[]>
  }
  deletePost(post: Post){
    let docRef=doc(this.fs, `Posts/${post.id}`);
    return deleteDoc(docRef)

  }
  updatePost(post:Post, posts:any){
    let docRef=doc(this.fs, `Posts/${post.id}`);
    return updateDoc(docRef,posts)

  }
  
}
