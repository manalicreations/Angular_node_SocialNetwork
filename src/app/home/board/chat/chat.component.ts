import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/service/interaction.service';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import * as io from 'socket.io-client';

interface reply {  name:string,  email: string}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages=[]
  username:string
  userEmail:string
  userData:any
  profilePic:string
  private socket;

  constructor(private int:InteractionService,private mess:MessageService,private user:UserService) { 
    this.user.userDetails.subscribe( data=>{
      if(data){
        this.userEmail=data.email
      }
    })
    this.socket = io();
  }

  ngOnInit() {
    this.userData=this.int.getChatUserName()
    if(this.userData){
      this.username=this.userData.name
      this.messages=[]
      this.getChat()
      
    }

    this.socket.on('newMessage', (data) => {     
      this.getChat()
    })
    
  }

  getChat(){
    let box=document.getElementById('overlay');

    this.mess.getChat(this.userEmail,this.userData.email).subscribe(data=>{
      if(data.body.success)
        this.messages=[]
        for(let st in data.body.result){
          this.user.getProfilePic(data.body.result[st].creater.email).subscribe(img=>{
            this.messages.push({
              name:data.body.result[st].creater.name,
              message:data.body.result[st].message,
              email:data.body.result[st].creater.email,
              profilePic:img.body.result.profilePic
            })
            
            box.scrollTop = box.scrollHeight-box.clientHeight
          })
          
        } 
    })
    
  }

  getProfilePic(){
    this.user.getProfilePic("tst@gmail.com").subscribe(data=>{
      if(data.body.success){
        this.profilePic=data.body.result.profilePic
      }
    })
  }

  sendMessage(message){
    this.mess.sendMessage(this.userEmail,this.userData.email,message).subscribe(data=>{
      if(data.body.success){
        console.log(this.userData)
        this.socket.emit('newMessage',message);
      }
    })

    
  }

}
