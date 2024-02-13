import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://localhost:5001/api/"
  token=""
  constructor(private http:HttpClient) { }

  getCompanies(){
    let headers= new HttpHeaders().set("Authorization","Bearer "+this.token)
    return this.http.get(this.url+"Companies", {headers:headers})
  }

  getUsers(){
    let headers= new HttpHeaders().set("Authorization","Bearer "+this.token)
    return this.http.get(this.url+"userlist", {headers:headers})
  }

  getClaims(id:any){
    let headers= new HttpHeaders().set("Authorization","Bearer "+this.token)
    return this.http.get(this.url+"userClaims/"+id, {headers:headers})
  }
  setClaims(id:any, claims:any){
    let body={id:id, roles:claims}
    let headers= new HttpHeaders().set("Authorization","Bearer "+this.token)
    return this.http.post(this.url+"userClaims/",body, {headers:headers})
  }

  addCompany(company:any){
    let headers= new HttpHeaders().set("Authorization","Bearer "+this.token)
    return this.http.post(this.url+"Companies",company, {headers:headers})

  }
  register(user:any){
    this.http.post(this.url+"Authentication/register",user)
    .subscribe(
      {
        next:()=>console.log("Sikeres Reg"),
        error:()=>console.log("Sikertelen  Regisztráció")
      }
    )
  }

  login(user:any){
    this.http.post(this.url+"Authentication/login",user)
    .subscribe(
      {
        next:(res:any)=>
        { 
          this.token=res.token
          console.log("Sikeres Login", this.token)
        },
        error:()=>console.log("Sikertelen  Belépés")
      }
    )
  }



}
