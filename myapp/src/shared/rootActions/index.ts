import { LOGIN_SUCC, ITEM_SET, LOGIN, SET_USER_ROLE } from "../rootConstants";
import axios from "axios";
const ENDPOINT = "http://localhost:8080/";
export const fetchItemsAction = (id?: number) => {
  return (dispatch: any) => {
    axios
      .get(ENDPOINT + "items?id=" + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        dispatch(setItemsAction(res.data));
      });
  };
};

export const updateItemsAction = (id: number, name: string) => {
  return (dispatch: any) => {
    axios
      .patch(
        ENDPOINT + "item/" + id,
        { itemName: name },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        dispatch(fetchItemsAction());
      });
  };
};

export const setItemsAction = (items: any[]) => {
  return {
    type: ITEM_SET,
    items,
  };
};

export const logInAction = (userName: string, userPass: string) => {
  return (dispatch: any) => {
    axios.post(ENDPOINT + "login", { userName, userPass }).then((res) => {
      if (res.data.status === "success") {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("role", res.data.data.role);

        dispatch(logInStatus(true));
        dispatch(setUserRole(res.data.data.role));
      } else {
        dispatch(logInStatus(false));
      }
    });
  };
};

export const logInStatus = (status: boolean) => {
  return {
    type: LOGIN_SUCC,
    status,
  };
};

export const setUserRole = (role: string) => {
  return {
    type: SET_USER_ROLE,
    role,
  };
};

export const loginAction = ({
  userName,
  passowrd,
}: {
  userName: string;
  passowrd: string;
}) => {
  return {
    type: LOGIN,
    payload: { userName, passowrd },
  };
};
