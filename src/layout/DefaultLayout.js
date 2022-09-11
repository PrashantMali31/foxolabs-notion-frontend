import React, {useEffect, useState} from "react"
import {AppSidebar, AppFooter, AppHeader} from "../components/index"
import {useAppsideBarTabs} from "../components/sidebar/useAppsideBarTabs"
import navigation from "../_nav"
import {CNavItem} from "@coreui/react"
import {
  cibPagekit,
} from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import {CSpinner} from "@coreui/react"

const DynamicTable = React.lazy(() => import("../components/dynamicTable/DynamicTable"));
const Charts = React.lazy(() => import("../views/charts/Charts"));


const DefaultLayout = () => {

  const {data: tabs, isLoading, error} = useAppsideBarTabs()
  const [selectedTab, setSelectedTab] = useState(null);
  const newTabs = [];

  tabs?.map((item) => {
    const tab = {
      index: item.index,
      component: CNavItem,
      name: item.text,
      to: "/dashboard",
      pageCode: item.pageCode,
      id: item.id,
      icon: <CIcon icon={cibPagekit} customClassName="nav-icon" />,
    }
    newTabs.push(tab)
    return item
  })

  const finalTabs = [...newTabs, ...navigation]
  finalTabs.sort(function (a, b) {
    return a.index - b.index;
  });

  if (error) {
    return (
      <div>
        <p>Error Occurred : {error}</p>
      </div>
    )
  }

  const handleMenu = (item, index) => {
    if (item?.index === 0) {
      setSelectedTab(null)
      return false
    }

    setSelectedTab(item);
    console.log("selectedTab", item)
    localStorage.setItem("selectedTab", JSON.stringify({...item, component: null, icon: null}))

    return true
  }


  useEffect(() => {
    const getPage = localStorage.getItem("selectedTab");
    const parsedPage = JSON.parse(getPage);
    console.log("parsedPage", parsedPage)
    setSelectedTab(parsedPage);
  }, [])
  return (
    <div >
      <AppSidebar tabStatus={finalTabs} handleMenu={handleMenu} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3" >
          {
            isLoading ? <div className='d-flex  p-3 ' style={{justifyContent: "center", alignItems: "center"}}><CSpinner color="#3c4b64" /></div> : (
              !selectedTab ? (
                <div>
                  <Charts />
                </div>
              ) : (<DynamicTable selectedTab={selectedTab} />)
            )
          }
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default React.memo(DefaultLayout)
