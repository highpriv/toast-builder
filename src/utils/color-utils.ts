export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  const cleanHex = hex.replace("#", "");

  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0]! + cleanHex[0]!, 16);
    const g = parseInt(cleanHex[1]! + cleanHex[1]!, 16);
    const b = parseInt(cleanHex[2]! + cleanHex[2]!, 16);
    return { r, g, b };
  }

  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }

  return null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number): string => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const lightenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = 1 + percent / 100;
  const r = Math.min(255, rgb.r * factor);
  const g = Math.min(255, rgb.g * factor);
  const b = Math.min(255, rgb.b * factor);

  return rgbToHex(r, g, b);
};

export const darkenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = 1 - percent / 100;
  const r = Math.max(0, rgb.r * factor);
  const g = Math.max(0, rgb.g * factor);
  const b = Math.max(0, rgb.b * factor);

  return rgbToHex(r, g, b);
};

export const getLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
};

export const getContrastRatio = (hex1: string, hex2: string): number => {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

export const meetsContrastRequirements = (
  foreground: string,
  background: string,
): boolean => {
  return getContrastRatio(foreground, background) >= 4.5;
};
