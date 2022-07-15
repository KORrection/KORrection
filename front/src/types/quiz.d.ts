interface IAnswer {
  text: string;
  correct: boolean;
}

export interface IQuiz {
  Commentary: string;
  answer: IAnswer[];
  text: string;
}
