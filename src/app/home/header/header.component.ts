import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username:string
  useremail:string
  userAlive:boolean

  constructor(private user:UserService,private auth:AuthService,private router:Router) {
    this.userAlive=false
    this.user.userDetails.subscribe( data=>{
      if(data){
        this.userAlive=true
        this.username=data.fname
        this.useremail=data.email
      }
      else this.userAlive=false
    })
   }

  ngOnInit() {

    this.user.userDetails.subscribe(data=>
      {
        if(data){     
          this.username=data.fname
        }
  })

  }

  logout(){
    this.auth.logout(this.useremail).subscribe(data=>{
      if(data.success){
        sessionStorage.setItem("user",null)
        this.router.navigate(['login']);
        location.reload();
      }
      else alert(data.message)
    })
  }
}
