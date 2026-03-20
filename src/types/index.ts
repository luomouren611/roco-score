export interface ScoreDimension {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  icon: string;
}

export interface AccountTag {
  label: string;
  color: string;
  icon: string;
}

export interface AccountGrade {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  label: string;
  color: string;
  bgColor: string;
  description: string;
}

export interface ScoreResult {
  account: string;
  totalScore: number;
  grade: AccountGrade;
  dimensions: ScoreDimension[];
  tags: AccountTag[];
}
