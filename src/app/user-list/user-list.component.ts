import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users:any=[]
  jogok=["SAdmin","Admin","User"]
  constructor(private auth:AuthService){
    this.auth.getUsers().subscribe(
      (res)=>{
        this.users=res
        for(let i=0; i<this.users.length;i++){
          this.auth.getClaims(this.users[i].id).subscribe(
            (res)=>this.users[i].claims=res
          )
        }
      }
    )
  }

  changeClaims(user:any,jog:any){}

}
