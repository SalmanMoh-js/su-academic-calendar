import { combineReducers } from 'redux';
import { dataReducer } from './dataReducer';

export const masterReducer = combineReducers({
  data: dataReducer,
});
