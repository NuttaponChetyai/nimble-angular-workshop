
import { Question } from "../Question";

export interface QuestionAnswerReq {
  questionCategoryId: string;
  questions: Question[]
}
