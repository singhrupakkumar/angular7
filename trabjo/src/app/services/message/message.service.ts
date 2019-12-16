import { Injectable } from '@angular/core';
import swal, { SweetAlertResult, SweetAlertType } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  /******************* toast messages ********************/
  toast(type: SweetAlertType, title: string) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 6000,
      animation: false,
      customClass: 'uk-animation-slide-right-small'
    });
    toast.fire({
      type: type,
      title: title,
    });
  }

  /******************* confirmation dialog box (returns a promise) ********************/
  async confirm(title: string, text?: string): Promise<SweetAlertResult> {
    const result: SweetAlertResult = await swal.fire({
      title: `Are you sure you want to ${title}?`,
      text: text,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      animation: false,
      allowOutsideClick: false,
      customClass: 'uk-animation-slide-top-small'
    });
    return result;
  }

  /******************* alert dialog box with button ********************/
  alert(type: SweetAlertType, title: string, text?: string) {
    swal.fire({
      type: type,
      title: title,
      animation: false,
      text: text,
      customClass: 'uk-animation-slide-top-small'
    });
  }

}

