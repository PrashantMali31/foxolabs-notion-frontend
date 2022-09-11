import React,{useState} from "react"
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from "@coreui/icons"

import { AppHeaderDropdown } from "./header/index"

const AppHeader = ({currentPagePath}) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state?.user.sidebarShow)
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => {dispatch({ type: "set", sidebarShow: !sidebarShow })}}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
              <h5 style={{margin:0}}>{currentPagePath}</h5>
            </CNavLink>
          </CNavItem>

        </CHeaderNav>
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
  
    </CHeader>
  )
}

export default AppHeader
