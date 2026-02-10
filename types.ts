
export interface IVocabularyItem {
  englishWord: string;
  hindiMeaning: string;
  englishSentence: string;
  hindiSentence: string;
}

export interface IVerb {
  verb: string;
  v1: string;
  v2: string;
  v3: string;
  hindiMeaning: string;
  example: {
    englishSentence: string;
    hindiSentence: string;
  };
}

export interface ISpokenPractice {
  title: string;
  englishParagraph: string;
  hindiParagraph: string;
}

export interface ILesson {
  day: number;
  theme: string;
  vocabulary: IVocabularyItem[];
  verbs: IVerb[];
  spokenPractice: ISpokenPractice;
  dailyTask: string;
}
