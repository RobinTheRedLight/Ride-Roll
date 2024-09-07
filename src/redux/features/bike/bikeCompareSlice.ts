import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Bike } from '../../../types';


interface BikeCompareState {
  selectedBikes: Bike[];
}

const initialState: BikeCompareState = {
  selectedBikes: [],
};

const bikeCompareSlice = createSlice({
  name: 'bikeCompare',
  initialState,
  reducers: {
    addBikeToCompare(state, action: PayloadAction<Bike>) {
    
      if (state.selectedBikes.length < 4) {
        state.selectedBikes.push(action.payload);
      }
    },
    removeBikeFromCompare(state, action: PayloadAction<string>) {
      state.selectedBikes = state.selectedBikes.filter(
        (bike) => bike._id !== action.payload
      );
    },
    clearComparison(state) {
      state.selectedBikes = [];
    },
  },
});

export const {
  addBikeToCompare,
  removeBikeFromCompare,
  clearComparison,
} = bikeCompareSlice.actions;

export const selectSelectedBikes = (state: RootState) =>
  state.bikeCompare.selectedBikes;

export default bikeCompareSlice.reducer;
