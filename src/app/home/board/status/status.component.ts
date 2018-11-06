import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  
  userAlive:Boolean
  
  constructor(private user:UserService) {
    this.userAlive=false
    this.user.userDetails.subscribe( data=>{
      if(data){
        this.userAlive=true
      }
      else this.userAlive=false
    })
   }

  ngOnInit() {
  }

}
