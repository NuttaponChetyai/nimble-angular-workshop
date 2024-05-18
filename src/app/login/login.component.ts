


import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ModalSuccessComponent } from '../components/modal-success/modal-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFailComponent } from '../components/modal-fail/modal-fail.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {

  formLogin: any = {
    username: null,
    password: null
  };
  submitted: boolean = false;

  constructor(private authService : AuthService, private modalService : NgbModal){
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
   
    this.authService.login(this.formLogin.username, this.formLogin.password).subscribe({
      next: data => {
        const modalRef = this.modalService.open(ModalSuccessComponent, {centered : true});
        modalRef.componentInstance.title = 'ดำเนินการสำเร็จ'
        modalRef.componentInstance.message = 'กรุณารอสักครู่ ระบบกำลังพาไปยังหน้าหลัก...'
        setTimeout(() => {
          this.modalService.dismissAll();
        }, 3000);
      },
      error: err => {
        const modalRef = this.modalService.open(ModalFailComponent, {centered : true});
        modalRef.componentInstance.title = 'เกิดข้อผิดพลาด'
        modalRef.componentInstance.message = 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลชื่อผู้ใช้หรือรหัสผ่าน'
      }
    });
  }

  openModalFunction() : void{

  }
}
