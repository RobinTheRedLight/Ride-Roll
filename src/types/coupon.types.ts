export type Coupon = {
  _id: string;
  code: string;
  discount: number;
  expiryDate: Date;
  description: string;
};