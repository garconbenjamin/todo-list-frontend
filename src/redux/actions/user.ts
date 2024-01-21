import { actions, UserSliceState } from "../reducers/userSlice";
import { store } from "../store";

const dispatch = store.dispatch;

const setUser = (user: UserSliceState) => {
  dispatch(actions.setUser(user));
};
const clearUser = () => {
  dispatch(actions.clearUser());
};
export { setUser, clearUser };
