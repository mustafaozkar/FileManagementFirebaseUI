import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authenticationComponents/login/login.component';
import { RegisterComponent } from './components/authenticationComponents/register/register.component';
import { HomeComponent } from './components/environmentComponents/home/home.component';
import { NotFoundComponent } from './components/environmentComponents/not-found/not-found.component';

import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard'
import { AdminLoginComponent } from './components/adminComponents/admin-login/admin-login.component';
import { AdminPanelComponent } from './components/adminComponents/admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { UserPanelComponent } from './components/userComponents/user-panel/user-panel.component';
import { PanelListComponent } from './components/panel-list/panel-list.component';
import { FileListComponent } from './components/fileManagementComponents/file-list/file-list.component';


const redirectToLogin = () => redirectUnauthorizedTo(["account/login"]);
const redirectToSelectPanel = () => redirectLoggedInTo(["panels"]);

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},

  {path:'account',...canActivate(redirectToSelectPanel),children:[
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent}
  ]},


  {path:'admin',...canActivate(redirectToLogin),canActivate:[AdminGuard],children:[
    {path:'',component:AdminPanelComponent},
    {path:'panel',component:AdminPanelComponent}
  ]},

  {path:'user',...canActivate(redirectToLogin),children:[
    {path:'',component:UserPanelComponent},
    {path:'panel',component:UserPanelComponent}
  ]},

  {path:'panels',component:PanelListComponent,...canActivate(redirectToLogin)},

  {path:'myFiles',component:FileListComponent},

  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
