export interface ValidationRule {
  fn: (field: string) => boolean;
  msg: string;
}

export type ValidationOption = Record<string, ValidationRule[]>;
