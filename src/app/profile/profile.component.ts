import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  regModel:any={}
  currentUser:any={}
  newPassword1:any
  newPassword2:any
  id:any

  constructor(private auth:AuthService, private aroute: ActivatedRoute, private router:Router){

    aroute.paramMap.subscribe(
      (params:any)=>{
        if (!params.params.id){
          this.id=null
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
        else{
          this.id=params.params.id
          this.auth.getUser(this.id).subscribe(
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
            }
          )

        }
      }
    )


}
  
  update(){
    this.regModel.id=this.currentUser.id
    this.auth.update(this.regModel).subscribe(
     {
          next:()=>{
            if  (!this.id) {
              this.auth.logout();
              this.router.navigate(["/signin"])
            }else {
              this.router.navigate(["/userlist"])

            }

          },
          error:()=>console.log("Sikertelen  Update")
     }

    )
  }

  changePassword(){
    if (this.newPassword1==this.newPassword2){
      let body={
        id:this.currentUser.id,
        currentPassword:"qasasa",
        newPassword:this.newPassword1
      }
      if (!this.id)
            this.auth.changeMyPassword(body)
      else 
            this.auth.changePassword(body) 
    }
  }
}
