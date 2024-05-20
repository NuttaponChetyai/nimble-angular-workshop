import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { QuestionCategoryRes } from '../models/response/QuestionCategoryRes';
import { QuestionDetailRes } from '../models/response/QuestionDetailRes';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json' , 
    'Authorization' : `Bearer ${localStorage.getItem('accessToken')}` 
  })
};

const AUTH_API = 'https://training-homework.calllab.net/v1/';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  
  constructor(private http: HttpClient,private authenService: AuthService) { }

  getQuestionCategories(): Observable<QuestionCategoryRes> {
    return this.http.get<QuestionCategoryRes>(
      AUTH_API + 'questions/categories',
      httpOptions
    );
  }

  getQuestionByCategoriesId(id?: string): Observable<QuestionDetailRes> {
    return this.http.get<QuestionDetailRes>(
      AUTH_API + `questions/categories/${id}`,
      httpOptions
    );
  }
}
