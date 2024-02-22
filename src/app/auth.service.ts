import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://localhost:5001/api/"
  private token=""
  private user:any={}
  private userSub= new BehaviorSubject(null)
  public SadminSub= new BehaviorSubject<boolean>(false)

  constructor(private http:HttpClient) { }

  logout(){
    this.token=""
    this.user=null
    this.SadminSub.next(false)
    this.userSub.next(null)
  }

  getCurrentUser(){
    return this.userSub
  }

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
  update(user:any){
    let head:any ={
      headers: new HttpHeaders().set("Authorization","Bearer "+this.token),
      'responseType':'text'
    }
    this.http.post("https://localhost:5001/api/Authentication/update",user, head)
    .subscribe(
      {
        next:()=>console.log("Sikeres Update"),
        error:()=>console.log("Sikertelen  Update")
      }
    )
  }
  changePassword(newPassword:any){
    let head:any ={
      headers: new HttpHeaders({"Authorization":"Bearer "+this.token}),  
      'responseType':'text'
    }
    console.log(newPassword)
    this.http.post("https://localhost:5001/api/Authentication/change",newPassword, head)
    .subscribe(
      {
        next:()=>console.log("Sikeres Jelszóvált"),
        error:()=>console.log("Sikertelen Jelszóvált")
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
          this.user=res.user
          this.user.token=res.token
          console.log("Sikeres Login", this.token)
          this.getClaims(this.user.id).subscribe(
            (claims)=> {
              if (!claims) claims=[]
              this.user.claims=claims
              this.SadminSub.next(this.user.claims.includes('SAdmin'))
              this.userSub.next(this.user)
            }

          )
        },
        error:()=>console.log("Sikertelen  Belépés")
      }
    )
  }



}
