import { Answer } from "../Answers";

export interface QuestionAnswerReq {
  questionId: string;
  answers: Answer[];
}
