import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/service/interaction.service';

interface user {  id:number,  fname: string,  lname: string,  email:string,  phone:number,  gender:string,  dob:string,  profilePic:string}


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  userDetails:user
  messages=[]

  constructor(
    private user:UserService,
    private mess:MessageService,
    private router:Router,
    private int:InteractionService) {
    this.user.userDetails.subscribe( data=>{
      if(data){
        this.userDetails=data
      }
    })
   }


  ngOnInit() {
    this.getMessages()
  }

  getMessages(){
    this.mess.getMessages(this.userDetails.email).subscribe(data=>{
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
          })     
        } 
    })
  }

  reply(name,email){
    this.int.setChatUserName({name,email})
    this.router.navigate(['/home/chat'])
  }



}
