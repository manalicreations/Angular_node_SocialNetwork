import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { InteractionService } from 'src/app/service/interaction.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
 
  userDetails={
    id:0,
    fname: "",
    lname: "",
    email:"",
    phone:0,
    gender:"",
    dob:""
  }

  recommendedUser=[]
  userAlive:string;
  reccuser:string

  ngOnInit(){
    this.interaction.GetotherMethod().subscribe(data=>{
      if(data==='rejectEvent' ||data=== 'unfriendEvent')
      this.refreshRecommendedList()
    })
  }
  constructor(private user:UserService,private auth:AuthService,private interaction:InteractionService) { 
    this.refreshRecommendedList()
  }

  refreshRecommendedList(){
    
    this.user.userDetails.subscribe(data=>{
      if(data){
        this.userDetails=data
        if(this.userDetails.email){
          this.user.getRecommendedFriends(this.userDetails.email).subscribe(data=>{
            this.recommendedUser=[]
            for(let a in data.body){
              this.recommendedUser.push(data.body[a])
            }
          })
        }    
      }
       
     
    });
  }
  invite(recieverEmail){
    this.user.sendInvite(this.userDetails.email,recieverEmail).subscribe(res=>{
      
        if(res.body.success){
          this.refreshRecommendedList()
        }
        else{
          //alert(res.body.message)
        }
      
    })
  }

  

}
