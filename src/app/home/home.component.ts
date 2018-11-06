import { Directive,Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userAlive:boolean

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
