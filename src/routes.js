import React from "react"

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const TableRender = React.lazy(() => import("./views/pages/page404/Page404"));
const DynamicTable = React.lazy(() => import("./components/dynamicTable/DynamicTable"));
const AllPages = React.lazy(() => import("./views/pages/adminPages/AllPages"));
const Users = React.lazy(() => import("./views/pages/adminUsers/Users"));
const UserAccess = React.lazy(() => import("./views/pages/adminUserAccess/UserAccess"));
const Notiontoken = React.lazy(() => import("./views/pages/adminNotiontoken/Notiontoken"));
const EmbeddedForm = React.lazy(() => import("./views/pages/EmbeddedForm"));


const routes = [
  {path: "/", exact: true, name: "Home"},
  {path: "/dashboard", name: "Dashboard", element: Dashboard},
  {path: "/tableRender/:id", name: "TableRender", element: TableRender},
  {path: "/views/pages/dynamicTable/DynamicTable", name: "DynamicTable", element: DynamicTable},
  {path: "/views/pages/adminPages/AllPages", name: "All Pages", element: AllPages},
  {path: "/views/pages/adminUsers/Users", name: "Users", element: Users},
  {path: "/views/pages/adminUserAccess", name: "UsersAccess", element: UserAccess},
  {path: "/views/pages/adminNotiontoken", name: "Notiontoken", element: Notiontoken},
  {path: "/views/pages/embeddedForm/:pageId", name: "EmbeddedForm", element: EmbeddedForm},

]

export default routes
