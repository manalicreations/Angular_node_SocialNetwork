import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  public otherMethod = new BehaviorSubject<any>(undefined);

  CallOtherMethod(param: any) {
      this.otherMethod.next(param);
  }
 
  GetotherMethod(): BehaviorSubject<any> {
     return this.otherMethod;
  }
  

}
