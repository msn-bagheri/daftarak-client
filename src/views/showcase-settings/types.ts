export interface ShowcaseProfileData {
  slug: string;
  name: string;
  phone: string; // Mandatory
  secondaryPhone?: string;
  whatsappNumber?: string;
  bio?: string;
  address?: string;
  workingHours?: string;
  showPrices: boolean;
  allowInquiryList: boolean;
  minOrderTotal?: number;
  // B2B Settlement & Shipping Preferences
  acceptsCash: boolean;
  acceptsCheque: boolean;
  acceptsCredit: boolean;
  shippingNotes?: string;
}
