// أنواع عناصر المحتوى
export type SiteContentType = "image" | "link" | "text";

export interface SiteContentItem {
  id: string;
  type: SiteContentType;
  value: string;
}

// بيانات أولية قابلة للتعديل (صور، روابط، نصوص...)
const siteContent: SiteContentItem[] = [
  { id: "logo", type: "image", value: "/logo.svg" },
  { id: "hero-image", type: "image", value: "/hero-image.jpg" },
  { id: "main-link", type: "link", value: "https://magiccarnation.com" },
  { id: "contact-email", type: "text", value: "info@magiccarnation.com" },
  { id: "footer-text", type: "text", value: "وكالة Magic Carnation المتخصصة في إنتاج محتوى تيك توك إبداعي وجذاب" },
  { id: "instagram", type: "link", value: "https://instagram.com/magic.carnation1" },
  { id: "tiktok", type: "link", value: "https://tiktok.com/@magic.carnation1" },
  { id: "youtube", type: "link", value: "https://youtube.com/@magic.carnation1" },
];

// أضف عناصر مثل شعار الموقع، نصوص رئيسية، روابط، صور رئيسية، إلخ
// مثال:
// { id: "main-title", type: "text", value: "أنشئ محتوى تيك توك يحقق ملايين المشاهدات" },
// { id: "hero-desc", type: "text", value: "نحن وكالة متخصصة في إنتاج محتوى تيك توك إبداعي وجذاب..." },

// تحميل البيانات من localStorage إذا وجدت
function loadFromStorage(): SiteContentItem[] {
  try {
    const data = localStorage.getItem("siteContent");
    if (data) return JSON.parse(data);
  } catch {}
  return siteContent;
}

// حفظ البيانات في localStorage
function saveToStorage(data: SiteContentItem[]) {
  try {
    localStorage.setItem("siteContent", JSON.stringify(data));
  } catch {}
}

// الحالة المركزية (تبدأ من localStorage أو البيانات الافتراضية)
let centralContent: SiteContentItem[] = loadFromStorage();

// تحديث عنصر محتوى حسب المعرف
export function updateSiteContent(id: string, newValue: string) {
  const idx = centralContent.findIndex(item => item.id === id);
  if (idx !== -1) {
    centralContent[idx] = { ...centralContent[idx], value: newValue };
    saveToStorage(centralContent);
  }
}

// تصدير البيانات المركزية
export default centralContent; 
