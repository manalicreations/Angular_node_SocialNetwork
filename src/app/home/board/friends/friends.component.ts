import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { InteractionService } from 'src/app/service/interaction.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  inviteList = []
  friendList = []

  constructor(private user: UserService,private interaction:InteractionService) { }

  ngOnInit() {
    this.refreshList()
  }

  refreshList() {
    this.user.userDetails.subscribe(data => {
      if(data){
        this.user.getAllInvites(data.email).subscribe(data => {
          this.inviteList = []
          if (data.body.result) {
            for (let a in data.body.result) {
              this.inviteList.push(data.body.result[a])
            }
          }
  
        })
  

        this.user.getAllFriends(data.email).subscribe(data => {
          this.friendList = []
          for (let a in data.body) {
            this.friendList.push(data.body[a])
          }
  
        })


      }
    })
  }

  accept(friendEmail) {
    this.user.userDetails.subscribe(data => {
      if(data){
        if(data.email!==friendEmail){
          this.user.acceptInvite(data.email, friendEmail).subscribe(data => {
            if (data.body.success) {
              this.refreshList()
            }
            else {
              //alert(data.body.message)
            }
          })
        }
        
      }
      
    })

  }

  reject(friendEmail) {
    this.user.userDetails.subscribe(data => {
      if(data){
        if(data.email!==friendEmail){
          this.user.rejectInvite(data.email, friendEmail).subscribe(data => {
            if (data.body.success) {
              this.refreshList()
              this.interaction.CallOtherMethod('rejectEvent')
            }
            else {
              //alert(data.body.message)
            }
          })
        }
        
      }
    })
  }

  unfriend(friendEmail) {
    this.user.userDetails.subscribe(data => {
      if(data){
        if(data.email!==friendEmail){
          this.user.unfriend(data.email, friendEmail).subscribe(data => {
            if (data.body.success) {
              this.refreshList()
              this.interaction.CallOtherMethod('unfriendEvent')
            }
          })
        }
        
      }
    })
  }



}
