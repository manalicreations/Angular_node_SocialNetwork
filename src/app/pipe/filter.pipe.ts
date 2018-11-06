import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value: any,args?:any){
    
    if(value.lenght===0)
    {
      return value;
    }
    let resultArray=[];
    for(let item of value){
    
      if(args!==undefined && item.toLowerCase().match('^.*'+args.toLowerCase()+'.*$')){
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
