import { Component, Input } from '@angular/core';
import { QuestionService } from '../_services/question.service';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFailComponent } from '../components/modal-fail/modal-fail.component';
import { QuestionCategory } from '../models/QuestionCategory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './question-category.component.html',
  styleUrl: './question-category.component.css',
})
export class QuestionCategoryComponent {
  categories: QuestionCategory[] = [];
  @Input() public categoryId: string = '';
  constructor(
    private questionService: QuestionService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categories = [];
    this.questionService.getQuestionCategories().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmitCategory(): void {
    if (!this.categoryId) {
      const modalRef = this.modalService.open(ModalFailComponent, {
        centered: true,
      });
      modalRef.componentInstance.title = 'เกิดข้อผิดพลาด';
      modalRef.componentInstance.message = 'กรุณาเลือกข้อมูลหมวดหมู่ข้อสอบ';
    } else {
      localStorage.setItem('categoryId', this.categoryId);
      this.router.navigate(['question'])
      
    }
  }
}
