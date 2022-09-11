import React from "react";
export const AuthContext = React.createContext({
  auth: {
    token: "",
    passData: "",
  },
  setAuth: () => {},
});
