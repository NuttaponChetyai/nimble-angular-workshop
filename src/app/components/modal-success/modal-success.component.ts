import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-success',
  standalone: true,
  imports: [],
  templateUrl: './modal-success.component.html',
  styleUrl: './modal-success.component.css'
})
export class ModalSuccessComponent {
  @Input() public title: string = '';
  @Input() public message: string = '';
  activeModal = inject(NgbActiveModal);

}
