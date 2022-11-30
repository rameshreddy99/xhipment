import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  postForm!:FormGroup;
  editForm!:FormGroup;
  postDetails:any;
  postData:any=[]
  postObj: Post={
    id: '',
    title: '',
    post: ''
  }
  constructor(private fb:FormBuilder,private postService:PostService){
    this.postForm= this.fb.group({
      title:['',Validators.required],
      post:['',Validators.required],
    });
    this.editForm= this.fb.group({
      edit_title:['',Validators.required],
      edit_post:['',Validators.required],
    })
  }


  ngOnInit(){
    this.getAllPosts()
  }

  addPost(){
    const{value}=this.postForm
    console.log(value)
    this.postObj.id='',
    this.postObj.title=value.title,
    this.postObj.post=value.post

    this.postService.addPost(this.postObj).then((post)=>{
      if(post){
        alert("Posted sucessfully")
        this.postForm.reset();
      }
    })
  }

  getAllPosts(){
    this.postService.getPosts().subscribe((res:Post[])=>{
      console.log(res)
      this.postData=res;
    })
  }
