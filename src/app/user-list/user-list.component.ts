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

  changeClaims(user:any,jog:any){
    console.log(user, jog)
    let i = this.users.findIndex(
      (u:any)=> u==user
    )
    let regiClaims=Object.assign([],this.users[i].claims)
    console.log("regi:", regiClaims)
    if (i>-1){
      if (this.users[i].claims.includes(jog))
      {
        
        this.users[i].claims=
        this.users[i].claims.filter(
          (e:any)=>e!=jog
        )
      }
      else {
        this.users[i].claims.push(jog)
      }
      console.log(this.users[i].claims)
      this.auth.setClaims(this.users[i].id,this.users[i].claims).subscribe(
        {
          next:()=>console.log("Sikeres jogbeállítás"),
          error:()=>{
            this.users[i].claims=regiClaims
            console.log("regi:", regiClaims)
            console.log("regi?:", this.users[i].claims)
             console.log("Sikertelen jogbeállítás")},
        }
      )
    }
  }

}
