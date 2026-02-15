export const isValidHexColor = (color: string): boolean => {
  const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
};

export const normalizeHexColor = (color: string): string => {
  return color.startsWith("#") ? color : `#${color}`;
};

export const validateDuration = (duration: number): boolean => {
  return duration > 0 && duration <= 30000;
};

export const validatePresetName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length > 0 && trimmed.length <= 50;
};

export const validateMessage = (message: string): boolean => {
  const trimmed = message.trim();
  return trimmed.length > 0 && trimmed.length <= 200;
};

export const validateTitle = (title: string): boolean => {
  const trimmed = title.trim();
  return trimmed.length <= 50;
};
