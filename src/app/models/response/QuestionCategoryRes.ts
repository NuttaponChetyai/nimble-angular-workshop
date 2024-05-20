import { QuestionCategory } from "../QuestionCategory";
import { BaseRes } from "./BaseRes";

export interface QuestionCategoryRes extends BaseRes {
  data: [QuestionCategory];
}

