import { Component, OnInit } from '@angular/core';
import {followsService} from 'app/service/follows.service'
import { JobofferService } from 'app/service/joboffer.service'
import { Router } from '@angular/router'
import io from 'socket.io-client';
@Component({
  selector: "app-notificationuser",
  templateUrl: "./notificationuser.component.html",
  styleUrls: ["./notificationuser.component.css"],
})
export class NotificationuserComponent implements OnInit {
 
  constructor(private followservice : followsService ,private jobservice : JobofferService) {  
    this.socket = io('http://localhost:4001')   }
  socket: any;
  token : string=localStorage.getItem("userid")
messages : any=[]

  followss : any;

  ngOnInit(): void {
    
   
    this.jobservice.decode(this.token).subscribe((id)=>{
      this.followservice.searchfollow(id.userid).subscribe((search)=>{
    
      for(let i = 0 ; i<search.length;i++){
      
      this.followservice.findnotification(search[i].idcompany).subscribe((not)=>{
       
      
       this.messages=not
       
      })
    }
    
    })
    this.socket.on('connection',(msg)=>console.log(msg))
  
    this.followservice.gettallfollow().subscribe((follows)=>{
    
    this.socket.on("notification" , (obj)=>{ 
    for(let i =0;i<follows.length;i++){
      if(follows[i].iduser===id.userid && follows[i].idcompany===obj.sender){
        this.messages.push(obj)
      }
    }
    })
  })
    
})

}}

 
