import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-teszt',
  templateUrl: './teszt.component.html',
  styleUrls: ['./teszt.component.css']
})
export class TesztComponent  {
  filek=[
    "../../assets/440.wav"
    ,"../../assets/441.mp3"
  ];
  i=0
  file:string=this.filek[0]
  @ViewChild("hang") hang!:ElementRef;
  idozito:any
  constructor(){
    this.file=this.filek[0]
  }

  kiir(){
    console.log(this.hang)
    this.hang.nativeElement.volume=0
    this.hang.nativeElement.play()

    this.idozito=setInterval(()=>{
      if (this.hang.nativeElement.volume<0.9)
        this.hang.nativeElement.volume+=0.1
    },200)
  }

  stop(){
    this.hang.nativeElement.pause()
    clearInterval(this.idozito)
    console.log("Megállítva:",this.hang.nativeElement.volume)
  }

  lep(){
    this.i+=1
    // this.file=this.filek[this.i]
    this.hang.nativeElement.src=this.filek[1]
    //this.file=this.filek[1]
    console.log("lép", this.file)
  }
}
