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
  constructor(private auth:AuthService, private router:Router){
    this.auth.getCurrentUser().subscribe(
      (user)=>this.currentUser=user
    )
  }

  logout(){
    this.auth.logout()
    this.router.navigate(['/signin'])
  }


}
