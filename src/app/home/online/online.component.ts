import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {

  online=[]
  offline=[]
  

  constructor(private auth:AuthService) {
    auth.getOnlineUsers().subscribe(data=>{
      for(let usr of data.result){
        if(usr.status==="online") this.online.push(usr.name)
        if(usr.status==="offline") this.offline.push(usr.name)
      }
      
    })
   }

  ngOnInit() {
  }
  

}
