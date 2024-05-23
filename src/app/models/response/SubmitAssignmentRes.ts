import { BaseRes } from "./BaseRes";

export interface SubmitAssignmentRes extends BaseRes {
    data: {
        fullScore: number,
        score: number
    };
  }
  