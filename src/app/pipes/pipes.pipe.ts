import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    if(arg === '' || arg.lenght < 3) return value;

    const resultClient = [];
    for(const client of value){
      if (client.phoneNumber.indexOf(arg) > -1){
          resultClient.push(client);
      }
    }
    return resultClient;
  }

}
