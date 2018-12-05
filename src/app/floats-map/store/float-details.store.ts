import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { FloatDetails } from '../models/float-details.model';

export interface FloatDetailsState {
  floatDetails: FloatDetails;
  loading: boolean;
  error: any;
}

const initialState: FloatDetailsState = {
  floatDetails: {
    id: null,
    path: [],
    saltinessValues: [],
    temperatureValues: [],
    pressureValues: []
  },
  loading: true,
  error: null
};
​
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'floatDetails' })
export class FloatDetailsStore extends Store<FloatDetailsState> {
  constructor() {
    super(initialState);
  }
}
