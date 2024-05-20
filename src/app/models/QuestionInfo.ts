import { QuestionAnswerInfo } from "./QuestionAnswerInfo";

export interface QuestionInfo {
    questionId: string,
    sequence: number,
    title: string,
    questionAnswerInfo:[QuestionAnswerInfo]
}