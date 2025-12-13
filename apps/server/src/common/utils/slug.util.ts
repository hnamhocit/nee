import defaultSlugify from 'slugify';

export function generateSlug(text: string): string {
  return defaultSlugify(text, {
    lower: true, // Chuyển thành chữ thường
    locale: 'vi', // Quan trọng: Hỗ trợ tiếng Việt (đ -> d)
    strict: true, // Loại bỏ ký tự đặc biệt (!, @, #...)
    trim: true,
  });
}
