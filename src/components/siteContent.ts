// أنواع عناصر المحتوى
export type SiteContentType = "image" | "link" | "text";

export interface SiteContentItem {
  id: string;
  type: SiteContentType;
  value: string;
}

// بيانات محدثة ومحسنة للموقع
const siteContent: SiteContentItem[] = [
  { id: "logo", type: "image", value: "/logo-magic.svg" },
  { id: "hero-image", type: "image", value: "/Character-working-desk-with-laptop 1.png" },
  { id: "main-link", type: "link", value: "https://magiccarnation.com" },
  { id: "contact-email", type: "text", value: "info@magiccarnation.com" },
  { id: "contact-phone", type: "text", value: "+966 50 123 4567" },
  { id: "contact-address", type: "text", value: "Riyadh, Saudi Arabia" },
  { id: "footer-text", type: "text", value: "وكالة Magic Carnation المتخصصة في إنتاج محتوى تيكتوك إبداعي وجذاب يحقق ملايين المشاهدات" },
  { id: "instagram", type: "link", value: "https://instagram.com/magic.carnation1" },
  { id: "tiktok", type: "link", value: "https://tiktok.com/@magic.carnation1" },
  { id: "youtube", type: "link", value: "https://youtube.com/@magic.carnation1" },
  { id: "whatsapp", type: "link", value: "https://wa.me/212655723182" },
  { id: "hero-title", type: "text", value: "إنشاء محتوى تيكتوك الوصول إلى الآلاف من المشاهدات" },
  { id: "hero-subtitle", type: "text", value: "نحن نتميز في إنتاج محتوى تيكتوك من خلال الإبداع والابتكار. تحويل أفكارك إلى فيديوهات شعبية." },
  { id: "services-title", type: "text", value: "خدماتنا" },
  { id: "services-subtitle", type: "text", value: "نقدم خدمات شاملة لنجاح محتواكم على التيكتوك" },
  { id: "portfolio-title", type: "text", value: "أعمالنا المميزة" },
  { id: "portfolio-subtitle", type: "text", value: "اكتشف أفضل عملنا." },
  { id: "contact-title", type: "text", value: "اتصل بنا" },
  { id: "contact-subtitle", type: "text", value: "أخبرنا عن مشروعك وسنعود إليك سريعًا." },
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
  } catch (error) {
    console.error('Error loading site content:', error);
  }
  return siteContent;
}

// حفظ البيانات في localStorage
function saveToStorage(data: SiteContentItem[]) {
  try {
    localStorage.setItem("siteContent", JSON.stringify(data));
  } catch (error) {
    console.error('Error saving site content:', error);
  }
}

// الحالة المركزية (تبدأ من localStorage أو البيانات الافتراضية)
const centralContent: SiteContentItem[] = loadFromStorage();

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