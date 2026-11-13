/**
 * Utility functions for Persian number and currency formatting
 */

export function toPersianDigits(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return '';
  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(val).replace(/\d/g, (d) => faDigits[parseInt(d, 10)]);
}

export function formatNumberFa(val: number | string | null | undefined): string {
  if (val === null || val === undefined || val === '') return '۰';
  const num = typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) : val;
  if (isNaN(num)) return toPersianDigits(String(val));
  const parts = Math.round(num).toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return toPersianDigits(parts.join('.'));
}

export function formatPriceFa(amount: number | string | null | undefined, unit = 'تومان'): string {
  return `${formatNumberFa(amount)} ${unit}`;
}
