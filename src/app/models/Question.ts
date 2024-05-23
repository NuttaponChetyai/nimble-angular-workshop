import { Answer } from "./Answers";

export interface Question {
    questionId: string;
    answers: Answer[];
}