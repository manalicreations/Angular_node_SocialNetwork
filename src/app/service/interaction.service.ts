import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface reply {  name:string,  email: string}

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  public otherMethod = new BehaviorSubject<any>(undefined);
  chatUserName:reply

  CallOtherMethod(param: any) {
      this.otherMethod.next(param);
  }
 
  GetotherMethod(): BehaviorSubject<any> {
     return this.otherMethod;
  }
  
  getChatUserName(){
    return this.chatUserName;
  }

  setChatUserName(name){
    this.chatUserName=name
  }

}
