import React from "react"
import {CFooter} from "@coreui/react"

const AppFooter = () => {
  return (
    <CFooter>
      <div>

        <span className="ms-1">&copy; 2022 Foxolab.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Foxolab
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
