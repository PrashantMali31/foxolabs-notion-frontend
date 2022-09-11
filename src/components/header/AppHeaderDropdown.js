import React from "react"
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react"
import {
  cilLockLocked,
} from "@coreui/icons"
import CIcon from "@coreui/icons-react"

import avatar8 from "./../../assets/images/avatars/8.jpg"


const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        
        <CDropdownItem href="#" onClick={(e)=>{
          e.preventDefault()
          location.reload()
          localStorage.clear();
        }}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout 
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
