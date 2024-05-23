import { Component, Input } from '@angular/core';
import { QuestionInfo } from '../models/QuestionInfo';
import { QuestionService } from '../_services/question.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFailComponent } from '../components/modal-fail/modal-fail.component';
import { QuestionDetailRes } from '../models/response/QuestionDetailRes';
import { FormsModule } from '@angular/forms';
import { QuestionAnswerReq } from '../models/request/QuestionAnswerReq';
import { Answer } from '../models/Answers';
import { SubmitAssignmentRes } from '../models/response/SubmitAssignmentRes';
@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './question-detail.component.html',
  styleUrl: './question-detail.component.css',
})
export class QuestionDetailComponent {
  questionDetail?: QuestionDetailRes;
  listQuestionInfo?: QuestionInfo[];
  questionInfo?: QuestionInfo;
  currentIndex: number = 0;
  answer: string[] = [];
  display: string = '';
  submitted: boolean = false;
  resultScore?: SubmitAssignmentRes;
  timer: any;
  listAnswer: QuestionAnswerReq = {
    questionCategoryId: "",
    questions: []
  };

  constructor(
    private questionService: QuestionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const categoryId = localStorage.getItem('categoryId');
    this.listAnswer.questionCategoryId = categoryId || "";
    if (categoryId) {
      this.questionService.getQuestionByCategoriesId(categoryId).subscribe({
        next: (data) => {
          this.questionDetail = data;
          this.listQuestionInfo = data.data.questionInfo;
          this.questionInfo = data.data.questionInfo[0];
          this.currentIndex = 0;
          this.countDown(data.data.timeLimitOfMinuteUnit);
        },
      });
    } else {
      const modalRef = this.modalService.open(ModalFailComponent, {
        centered: true,
      });
      modalRef.componentInstance.title = 'เกิดข้อผิดพลาด';
      modalRef.componentInstance.message =
        'ไม่พบข้อข้อมูลหมวดหมู่ข้อสอบที่เลือก';
    }
  }

  next(id: string): void {
    const totalQuestion = this.listQuestionInfo?.length || 0;
    if (!this.validateChoice(this.answer)) {
      return;
    }
    if (this.currentIndex <= totalQuestion - 1) {
      this.currentIndex++;
      this.questionInfo = this.listQuestionInfo?.at(this.currentIndex);
      const data: Answer[] = [];
      this.answer.forEach((values) => {
        data.push({ questionAnswerId: values });
      });
      this.listAnswer?.questions.push({
        questionId: id,
        answers: data
      });
      this.answer = [];
    }
  }
  

  back(): void {
    if (this.currentIndex >= 1) {
      this.currentIndex--;
      this.questionInfo = this.listQuestionInfo?.at(this.currentIndex);
      this.listAnswer?.questions.pop();
      this.answer = [];
    }
  }

  sendAnswer(): void {
    this.questionService.submitAssignment(this.listAnswer!).subscribe({
      next: (res) => {
        this.submitted = true;
        this.resultScore = res;
      }
    });
  }

  onChangeValue(answerId: string): void {
    const isDuplicate = this.answer.some((cond) => cond == answerId);
    if (isDuplicate) {
      this.answer = this.answer.filter((value) => value != answerId);
    } else {
      this.answer.push(answerId);
    }
  }

  countDown(minute: number): void {
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minute < 10 ? '0' : '';

    this.timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  stopCount(){
    clearInterval(this.timer);
  }

  private validateChoice(choiceSelected: string[]): boolean {
    if (choiceSelected.length <= 0) {
      const modalRef = this.modalService.open(ModalFailComponent, {
        centered: true,
      });
      modalRef.componentInstance.title = 'เกิดข้อผิดพลาด';
      modalRef.componentInstance.message = 'กรุณาเลือกคำตอบอย่างน้อย 1 รายการ';
      return false;
    } else {
      return true;
    }
  }
}
