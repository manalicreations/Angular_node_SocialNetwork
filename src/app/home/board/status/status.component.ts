import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

interface user { id: number, fname: string, lname: string, email: string, phone: number, gender: string, dob: string, profilePic: string }

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  userAlive: Boolean
  userDetails: user

  status = []

  constructor(private user: UserService) {

    this.user.userDetails.subscribe(data => {
      if (data) {
        this.userDetails = data
      }

    })
  }

  ngOnInit() {
    this.refreshStatus()
  }

  refreshStatus() {
    this.user.getAllStatus().subscribe(data => {
      if (data.body.success)
        this.status = []

      for (let st in data.body.result) {
        let userName = data.body.result[st].creater.name
        let userEmail = data.body.result[st].creater.email
        let status = data.body.result[st].status 

        this.user.getUser(userEmail).subscribe((data2=>{
          let profilePic=data2.result.profilePic
          this.status.push({userName,profilePic, status:status })
        }))

        
      }
    })
  }

  setStatus(status) {
    this.user.setStatus(status, this.userDetails.email).subscribe(data => {
      if (data.body.success) {
        this.refreshStatus()
      }
    })
  }

}
