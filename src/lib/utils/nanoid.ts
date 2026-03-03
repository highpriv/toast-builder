import { nanoid } from "nanoid";
export const generateId = (size: number = 10): string => nanoid(size);
