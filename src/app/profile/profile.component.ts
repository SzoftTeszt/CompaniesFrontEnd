import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  regModel:any={}
  currentUser:any={}

  constructor(private auth:AuthService){
    this.auth.getCurrentUser().subscribe(
      (user:any)=>{
        this.currentUser=user
        if (user){
          console.log(user)
          this.regModel.username=user.userName;
          this.regModel.firstName=user.firstName;
          this.regModel.lastName=user.lastName;
          this.regModel.email=user.email
          this.regModel.address=user.address
        }
           
  })
}
  
  update(){
    this.regModel.id=this.currentUser.id
    this.auth.update(this.regModel)
  }
}
