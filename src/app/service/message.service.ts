import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


interface user {  id:number,  fname: string,  lname: string,  email:string,  phone:number,  gender:string,  dob:string,  profilePic:string}

interface res{    success:boolean,    message:string,    result:any }


@Injectable({
    providedIn: 'root'
  })

export class MessageService {

    constructor(private http: HttpClient) {}

    sendMessage(myEmail,friendEmail,messageContent) {
        return this.http.post<res>('/api/message/sendMessage', {myEmail,friendEmail,messageContent }, { observe: 'response' });
    }

    getMessages(email){
        return this.http.get<res>('/api/message/getAllMessage',{ observe: 'response', params:{email:email}  });
    }

    getChat(myEmail,friendEmail){
        return this.http.get<res>('/api/message/getChat',{ observe: 'response', params:{myEmail,friendEmail}  });
    }

}