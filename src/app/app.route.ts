import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './home/board/friends/friends.component';
import { MessagesComponent } from './home/board/messages/messages.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './home/board/profile/profile.component';
import { StatusComponent } from './home/board/status/status.component';
import { AuthGuard } from './auth.guard';
import { ChatComponent } from './home/board/chat/chat.component';
import { DetailComponent } from './home/detail/detail.component';
import { OnlineComponent } from './home/online/online.component';

const APP_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'home',
        component: HomeComponent, children: [
            {
                path: 'status',
                component: StatusComponent
            },
            {
                path: 'friends',
                component: FriendsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'messages',
                component: MessagesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'chat',
                component: ChatComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'detail',
                component: DetailComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'online',
                component: OnlineComponent,
                canActivate: [AuthGuard]
            },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '**',
        component: LoginComponent
    }

];

export const Routing = RouterModule.forRoot(APP_ROUTES);