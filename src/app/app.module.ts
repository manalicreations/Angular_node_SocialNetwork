import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { HeaderComponent } from './home/header/header.component';
import { ChatComponent } from './home/chat/chat.component';
import { DetailComponent } from './home/detail/detail.component';
import { BoardComponent } from './home/board/board.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/board/profile/profile.component';
import { StatusComponent } from './home/board/status/status.component';
import { IfUserAliveDirective } from './directive/if-user-alive.directive';
import { FilterPipe } from './pipe/filter.pipe';
import { FriendsComponent } from './home/board/friends/friends.component';
import { MessagesComponent } from './home/board/messages/messages.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routing } from './app.route'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ChatComponent,
    DetailComponent,
    BoardComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    StatusComponent,
    IfUserAliveDirective,
    FilterPipe,
    FriendsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Routing
  ],
  //providers: [AuthService,UserService,AuthGuard],
  providers: [AuthService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
