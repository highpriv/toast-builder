export interface ImageCompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeKB?: number;
}

export const compressImage = async (
  file: File,
  options: ImageCompressionOptions = {},
): Promise<string> => {
  const {
    maxWidth = 128,
    maxHeight = 128,
    quality = 0.8,
    maxSizeKB = 100,
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        let currentQuality = quality;
        let base64 = canvas.toDataURL("image/png", currentQuality);

        while (
          base64.length > maxSizeKB * 1024 * 1.37 &&
          currentQuality > 0.1
        ) {
          currentQuality -= 0.1;
          base64 = canvas.toDataURL("image/png", currentQuality);
        }

        resolve(base64);
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (file: File): string | null => {
  const validTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  if (!validTypes.includes(file.type)) {
    return "Invalid file type. Please upload PNG, JPEG, GIF, WebP, or SVG.";
  }

  const maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File size must be less than ${maxSizeMB}MB.`;
  }

  return null;
};

export const validateImageUrl = (url: string): string | null => {
  if (!url || url.trim().length === 0) {
    return null;
  }

  const validExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];
  const lowerUrl = url.toLowerCase();

  const hasValidExtension = validExtensions.some((ext) =>
    lowerUrl.endsWith(ext),
  );

  if (!hasValidExtension) {
    return "Invalid image URL. Must end with .png, .jpg, .jpeg, .gif, .webp, or .svg";
  }

  return null;
};
