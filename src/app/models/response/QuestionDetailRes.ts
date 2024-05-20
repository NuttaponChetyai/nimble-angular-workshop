import { QuestionInfo } from '../QuestionInfo';
import { BaseRes } from './BaseRes';

export interface QuestionDetailRes extends BaseRes {
  data: {
    questionCategoryId: string;
    title: string;
    totalQuestion: number;
    level: string;
    timeLimitOfMinuteUnit: number;
    questionInfo: [QuestionInfo];
  };
}
