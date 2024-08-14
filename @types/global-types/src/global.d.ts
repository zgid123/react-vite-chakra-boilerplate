declare global {
  type TAny = any;
  type TObject = Object;
  type PartialKeys<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
}

export {};
