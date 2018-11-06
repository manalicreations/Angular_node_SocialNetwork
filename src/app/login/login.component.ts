import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router,private user:UserService) { 
    
  }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    const target = event.target;

    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;


    this.auth.login(username,password).subscribe(res=>{  
      if(res.status==200 && res.body.success){
        this.auth.isUserExists(username).subscribe(res=>{
          if(res.body.status){
            sessionStorage.setItem("user",null)
            sessionStorage.setItem("user",username)

            this.user.getUser(username).subscribe(res=>{
              if(res.success)
              this.user.setUserDetails(res.result)
            })

            this.router.navigate(['home/status']);
          }
          else alert('user session doesnt exist in backend')
        })

      }
      else alert('login failed')
    })
  }
}
