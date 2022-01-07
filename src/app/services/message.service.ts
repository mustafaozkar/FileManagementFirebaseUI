import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastService: HotToastService) { }

  success(message:string){
    this.toastService.success(message);
  }

  error(message:string){
    this.toastService.error(message);
  }

  warning(message:string){
    this.toastService.warning(message);
  }

}
