import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  regModel:any={}
  constructor(private auth:AuthService){}
  register(){
   
     this.auth.register(this.regModel)
   }
}
