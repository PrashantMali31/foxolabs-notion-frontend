
import * as Types from "./types"


const initialState = {
  isLoading: false,
  user: null,
  isLoggedIn: false,
  isAdminLoggedIn: false,
  sidebarShow: true,
  sidebarUnfoldable: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case Types.LOGIN_PENDING:
    return {
      ...state,
      isLoading: true,
      isLoggedIn: false,
    };
  case Types.LOGIN_FULFILLED:
    return {
      user: action.payload,
      isLoading: false,
      isLoggedIn: true
    }
  case Types.LOGIN_REJECTED:
    return {
      user: null,
      isLoading: false,
      isLoggedIn: false
    }
  case Types.ADMIN_LOGIN_PENDING:
    return {
      ...state,
      isLoading: true,
      isAdminLoggedIn: false,
    };
  case Types.ADMIN_LOGIN_FULFILLED:
    return {
      user: action.payload,
      isLoading: false,
      isAdminLoggedIn: true
    }
  case Types.ADMIN_LOGIN_REJECTED:
    return {
      user: null,
      isLoading: false,
      isAdminLoggedIn: false
    }
      
  case "set":
    return {
      sidebarShow: action.sidebarShow,
      sidebarUnfoldable: action.sidebarUnfoldable
    }
  default:
    return state;
  }
}
export default reducer;