


import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ModalSuccessComponent } from '../components/modal-success/modal-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFailComponent } from '../components/modal-fail/modal-fail.component';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {

  form = {
    username: '',
    password: ''
  };
  submitted: boolean = false;

  constructor(private authService : AuthService, private modalService : NgbModal,private router: Router){
  }

  ngOnInit(): void {
    if(localStorage.getItem('accessToken')){
      this.router.navigate(['categories'])
    }
  }

  onSubmit(): void {
   
    this.authService.login(this.form.username, this.form.password).subscribe({
      next: data => {
        localStorage.setItem('accessToken', data.data.accessToken)
        const modalRef = this.modalService.open(ModalSuccessComponent, {centered : true});
        modalRef.componentInstance.title = 'ดำเนินการสำเร็จ'
        modalRef.componentInstance.message = 'กรุณารอสักครู่ ระบบกำลังพาไปยังหน้าหลัก...'
        setTimeout(() => {
          console.log('redirect');
          this.router.navigate(['categories'])
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
}
