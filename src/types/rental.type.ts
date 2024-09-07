export type Rental = {
  _id: string;
  userId: string;
  bikeId: string;
  startTime: Date;
  returnTime: Date | null;
  totalCost: number;
  isReturned: boolean;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
