import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser:any
  SAdmin=false
  constructor(private auth:AuthService, private router:Router){
    this.auth.getCurrentUser().subscribe(
      (user)=>this.currentUser=user
    )
    this.auth.SadminSub.subscribe(
      (res)=> this.SAdmin=res
    )
  }

  logout(){
    this.auth.logout()
    this.router.navigate(['/signin'])
  }


}
