import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent {
  loginModel:any={}

  constructor(private auth:AuthService){}
  
  login(){
      this.auth.login(this.loginModel)
  }}
