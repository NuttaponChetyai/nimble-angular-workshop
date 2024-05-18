import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-fail',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './modal-fail.component.html',
  styleUrl: './modal-fail.component.css'
})
export class ModalFailComponent {
  @Input() public title: string = '';
  @Input() public message: string = '';
  activeModal = inject(NgbActiveModal);
}
