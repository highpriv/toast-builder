export function validateImageUrl(url: string): boolean {
  // ...validation logic...
  return /^https?:\/\/.+\.(png|jpg|jpeg|gif|webp|svg)$/.test(url);
}
