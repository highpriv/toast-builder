import { nanoid } from "nanoid";

export const generateId = (size: number = 10): string => {
  return nanoid(size);
};

export const generatePresetId = (): string => {
  return nanoid(8);
};
