export const WHATSAPP_NUMBER = "919751135325";
export const SHOP_PHONE = "+91 9751135325";
export const SHOP_ADDRESS =
  "Om Sakthi Printers, Main Bazaar, Sattur - 626 203, Tamil Nadu";

export const TRANSLATIONS = {
  en: {
    hero_title: "Where Every Design",
    hero_title2: "Tells Your Story",
    hero_sub: "Premium Digital Printing in Sattur, Tamil Nadu",
    hero_cta: "Explore Designs",
    hero_whatsapp: "WhatsApp Us",
    nav_home: "Home",
    nav_gallery: "Gallery",
    nav_services: "Services",
    nav_about: "About",
    nav_contact: "Contact",
    order_btn: "Order This Design",
    enquire_btn: "Enquire Now",
  },
  ta: {
    hero_title: "ஒவ்வொரு வடிவமும்",
    hero_title2: "உங்கள் கதை சொல்கிறது",
    hero_sub: "சத்தூரில் சிறந்த டிஜிட்டல் அச்சகம்",
    hero_cta: "வடிவங்களை காண்க",
    hero_whatsapp: "வாட்ஸ்அப் செய்",
    nav_home: "முகப்பு",
    nav_gallery: "கேலரி",
    nav_services: "சேவைகள்",
    nav_about: "பற்றி",
    nav_contact: "தொடர்பு",
    order_btn: "இந்த வடிவம் ஆர்டர்",
    enquire_btn: "விசாரிக்கவும்",
  },
};

import { supabase } from "../supabase"; 

const { data: designsData } = await supabase.from("designs").select("*");
const { data: categoriesData } = await supabase.from("categories").select("*");
const { data: servicesData } = await supabase.from("services").select("*");

export const CATEGORIES = categoriesData || [];
export const SERVICES = servicesData || [];

export const DESIGNS = (designsData || []).map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  tag: item.tag,
  image: item.image,
  images: item.images,
  description: item.description,
  details: {
    finish: item.finish,
    size: item.size,
    minQty: item.min_qty,
    delivery: item.delivery,
  },
}));
