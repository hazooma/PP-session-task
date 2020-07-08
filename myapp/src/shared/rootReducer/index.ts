import { combineReducers } from "redux";
import { ITEM_SET, LOGIN_SUCC, SET_USER_ROLE } from "../rootConstants";

export interface ItemState {
  readonly items: Item[];
}

const initialState = {
  items: [],
};

export const itemReducer = (
  state: ItemState = initialState,
  action: any,
): ItemState => {
  switch (action.type) {
    case ITEM_SET:
      return Object.assign({}, state, {
        items: action.items,
      });
    case LOGIN_SUCC:
      return Object.assign({}, state, {
        loggingIn: action.status,
      });
    case SET_USER_ROLE:
      return Object.assign({}, state, {
        role: action.role,
      });

    default:
      return state;
  }
};
interface Item {
  name: string;
  id: number;
}
export type RootState = {
  Item: { items: Item[] | undefined };
};

// App Reducer
const reducers = combineReducers({ App: itemReducer });

export default reducers;
