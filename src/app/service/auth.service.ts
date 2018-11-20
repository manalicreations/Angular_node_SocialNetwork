import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http'
import { throwError } from '../../../node_modules/rxjs';
import { retry,catchError } from 'rxjs/operators';


interface register {
  success: boolean,
  message: string
}

interface profile {
  success: boolean,
  email: string,
  message: string
}

interface isLoggedIn {
  status: boolean
}

interface res{
  success: boolean,
  message:string,
  result:any,
  status:boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  constructor(private http: HttpClient) { 
  }

  login(username, password){
    return this.http.post<res>('/api/auth/login', { email: username, password }, { observe: 'response' }).pipe(
      retry(0),
      catchError(this.handleError));
  }//used

  isUserExists(id:string){
    const params = new HttpParams();
    params.set('email', id);
    return this.http.get<res>('/api/auth/isUserLoggedIn',{ observe: 'response', params:{email:id}  });
  }

  logout(username){
    return this.http.delete<res>('api/auth/logout',{params:{email:username}});
  }

  getOnlineUsers(){
    return this.http.get<res>('api/auth/onlineUsers');
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if(error.status==504) alert('Backend is not working')
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
