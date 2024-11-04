import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.sass']
})
export class PopupMessageComponent {
constructor(private modalRef: NzModalRef) { }

  closeModal() {
    this.modalRef.destroy();
  }
}
