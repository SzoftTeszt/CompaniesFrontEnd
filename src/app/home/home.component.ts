import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private auth:AuthService){}
  companies:any
  regModel:any={}
  loginModel:any={}
  newCompany:any={}
  getCompanies(){
    this.auth.getCompanies().subscribe(
      {
        next:(res)=>{this.companies=res},
        error:(res)=>{this.companies=res},
      }
    )
  }

  register(){
   let user= {
      "username": "JBela",
      "firstName": "Béla",
      "lastName": "Józsa",
      "email": "jbela@example.com",
      "password": "Almafa12;"
    }
    this.auth.register(this.regModel)
  }

  login(){
    let user={
      "username": "JBela",
      "password": "Almafa12;"
    }
    this.auth.login(this.loginModel)
  }

  addCompany(){
    this.auth.addCompany(this.newCompany).subscribe()
  }

}
