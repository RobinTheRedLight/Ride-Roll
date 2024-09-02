import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TUserState = {
  couponCode: string | null;
};

const initialState: TUserState = {
  couponCode: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
    clearCouponCode: (state) => {
      state.couponCode = null;
    },
  },
});

export const { setCouponCode, clearCouponCode } = userSlice.actions;
export const selectCouponCode = (state: RootState) => state.user.couponCode;

export default userSlice.reducer;
