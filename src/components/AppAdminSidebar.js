import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {
  cilSpeedometer,
  cibPagekit,
} from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import {CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CSpinner} from "@coreui/react"
import {sygnet} from "src/assets/brand/sygnet"
import SimpleBar from "simplebar-react"
import "simplebar/dist/simplebar.min.css"
import {Link} from "react-router-dom"

const AppAdminSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state?.user.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state?.user.sidebarShow)
  const [selected, setSelected] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState();
  const sideMenuItem = [
    {
      id: 1,
      menu: "Dashboard",
      path: "/"
    },
    {
      id: 2,
      menu: "All Pages",
      path: "/allpages"
    },
    {
      id: 3,
      menu: "Notion Token",
      path: "/notiontoken"
    },
    {
      id: 4,
      menu: "Users",
      path: "/users"
    },
    {
      id: 5,
      menu: "Users Access",
      path: "/usersaccess"
    },
    // {
    //   id: 5,
    //   menu: "Schemas",
    //   path:"/syncSchems"
    // },

  ]

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({type: "set", sidebarShow: visible})
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <p>FoxoLab Admin</p>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>

          {
            isLoading ? <div className='d-flex  p-3 ' style={{justifyContent: "center", alignItems: "center"}}><CSpinner color="#3c4b64" /></div> : (
              sideMenuItem.map((item, index) => {
                return (
                  <Link to={item.path} >
                    <div className="sidebarItem" style={{backgroundColor: item.id === selectedTab ? "rgb(211, 211, 211)" : "transparent"}}>
                      {index === 0 ? <CIcon icon={cilSpeedometer} style={{color: "#fefefe", paddingLeft: unfoldable ? "10px" : "0"}} customClassName="nav-icon" /> : <CIcon icon={cibPagekit} style={{color: "#fefefe", paddingLeft: unfoldable ? "10px" : "0"}} customClassName="nav-icon" />}
                      <p style={{color: item.id === selectedTab ? "#000" : "#fff", fontWeight: "500", paddingLeft: unfoldable ? "10px" : "0"}}>{item.menu}</p>
                    </div>
                  </Link>
                )
              }
              )
            )
          }


        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({type: "set", sidebarUnfoldable: !unfoldable})}
      />
    </CSidebar>
  )
}

export default React.memo(AppAdminSidebar)
