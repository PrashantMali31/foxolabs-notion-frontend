import React, {useEffect, useState} from "react"
import {  AppAdminSidebar, AppFooter, AppHeader, } from "../components/index"

const Charts = React.lazy(() => import("../views/charts/Charts"));

const AdminDashboard = () => {
  const currentPagePath = "Dashboard";
  
  return (
    <div>
      <AppAdminSidebar  />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader currentPagePath={currentPagePath} />
        <div className="body flex-grow-1 px-3">
          <div>
            <Charts />
          </div>
        </div>
        <AppFooter />
      </div>
    </div>

  )
}

export default React.memo(AdminDashboard)
