export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
  XMAS24: "XMAS24",
  NY2025: "NY25",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
