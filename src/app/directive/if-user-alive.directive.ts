import { Directive, ElementRef, Renderer, OnChanges, Input } from '@angular/core';

@Directive({
  selector: '[appIfUserAlive]'
})
export class IfUserAliveDirective implements OnChanges{

  @Input() appIfUserAlive:boolean

  constructor(private ele:ElementRef,private render:Renderer) { 
    this.appIfUserAlive=false
  }

  ngOnChanges(){
    
    if(this.appIfUserAlive){
      this.render.setElementStyle(this.ele.nativeElement,'visibility','visible')
    }
    else {
      this.render.setElementStyle(this.ele.nativeElement,'visibility','hidden')
    }

  }

}
