import React, {Component, useEffect, Suspense} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import "alertifyjs/build/css/alertify.css";

import "./scss/style.scss";
import {useSelector} from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const AdminDashboard = React.lazy(() => import("./layout/AdminDashboard"));
const AllPages = React.lazy(() => import("./views/pages/adminPages/AllPages"));
const Users = React.lazy(() => import("./views/pages/adminUsers/Users"));
const UserAccess = React.lazy(() => import("./views/pages/adminUserAccess/UserAccess"));
const Notiontoken = React.lazy(() => import("./views/pages/adminNotiontoken/Notiontoken"));
const SyncSchema = React.lazy(() => import("./views/pages/adminPages/SyncSchema"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const EmbeddedForm = React.lazy(() => import("./views/pages/EmbeddedForm"));

const App = () => {
  const [isLoggedin, setIsLoggedIn] = React.useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = React.useState(false);
  const data = useSelector(state => state);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const admintoken = localStorage.getItem("admin_token");

    const tokenJson = JSON.parse(token);

    if (data?.user?.isLoggedIn || tokenJson) {
      setIsLoggedIn(true)
    }
    if (data?.user?.isAdminLoggedIn || admintoken) {
      setIsAdminLoggedIn(true)
    }


  }, [data])
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        {
          isLoggedin ? (
            <Routes>
              <Route path="/" name="Home" element={<DefaultLayout />} />
            </Routes>
          ) : isAdminLoggedIn ? (
            <Routes>
              <Route path="/AdminDashboard" name="AdminDashboard" element={<AdminDashboard />} />
              <Route path="/" name="AdminDashboard" element={<AdminDashboard />} />
              <Route path="/allpages" name="All Pages" element={<AllPages />} />
              <Route path="/users" name="Users" element={<Users />} />
              <Route path="/usersaccess" name="Users  Access" element={<UserAccess />} />
              <Route path="/notiontoken" name="Notion Token" element={<Notiontoken />} />
              <Route path="/syncSchems" name="Notion Token" element={<SyncSchema />} />
              <Route path="/embeddedForm/:pageId" name="Embedded Form" element={<EmbeddedForm />} />
            </Routes>
          ) : (
            <Routes>
              <Route exact path="*" name="Login Page" element={<Login />} />
              <Route path="/" name="Home" element={<Login />} />

            </Routes>
          )
        }

      </Suspense>
    </HashRouter>
  );

}

export default App;
