import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { ProfileComponent } from './profile/profile.component';
import { sAdminGuard } from './sadmin.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"signin", component:SinginComponent},
  {path:"signup", component:SingupComponent},
  {path:"profile", component:ProfileComponent},
  {path:"userlist", component:UserListComponent, canActivate:[sAdminGuard]},
  {path:"**", component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
