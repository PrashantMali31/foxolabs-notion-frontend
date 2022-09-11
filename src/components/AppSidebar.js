import React, {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {
  cilSpeedometer,
  cibPagekit,
} from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import {CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler} from "@coreui/react"
import {sygnet} from "src/assets/brand/sygnet"
import SimpleBar from "simplebar-react"
import "simplebar/dist/simplebar.min.css"


const AppSidebar = ({tabStatus, handleMenu}) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state?.user.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state?.user.sidebarShow)
  const [selected, setSelected] = useState(0);
  const handleMenuTab = (item, index) => {
    localStorage.setItem("ActiveTab", JSON.stringify(index));
    handleMenu(item, index)
  }

  useEffect(() => {
    const tab = localStorage.getItem("ActiveTab");
    const parsedtab = JSON.parse(tab);
    setSelected(parsedtab);

  }, [handleMenuTab])

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
        <p>FoxoLab CMS</p>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <div >
            {
              tabStatus && tabStatus.map((item, index) => {
                return (
                  <div
                    className='sidebarItem'
                    onClick={() => handleMenuTab(item, index)}
                    style={{
                      marginBottom: 10,
                      backgroundColor: selected === index ? "#d3d3d3" : "transparent",
                      display: "flex",
                      paddingLeft: 10,
                      alignItems: "center",
                    }}
                  >
                    {/* style={{marginBottom: 10, backgroundColor: 'transparent', display: 'flex', paddingLeft: 10, alignItems: 'center', }}> */}
                    <CIcon icon={index === 0 ? cilSpeedometer : cibPagekit} style={{color: selected === index ? "#000" : "#fefefe", paddingLeft: unfoldable ? "10px" : "0"}} customClassName="nav-icon" />
                    <p style={{color: selected === index ? "#000" : "#fefefe", fontWeight: "500", paddingLeft: unfoldable ? "10px" : "0"}}>{item.name}</p>
                  </div>
                )

              })
            }
          </div>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({type: "set", sidebarUnfoldable: !unfoldable})}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
