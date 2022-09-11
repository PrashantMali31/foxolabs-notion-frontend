const BASE_URL =
  "http://foxolabnodeapp-env.eba-btapvigm.us-west-2.elasticbeanstalk.com/api/";
// const BASE_URL = "http://localhost:3002/api/";
// const BASE_URL = 'https://notion-be.herokuapp.com/api/'
export const config = {
  BASE_URL:
    "http://foxolabnodeapp-env.eba-btapvigm.us-west-2.elasticbeanstalk.com/api/",
  // BASE_URL: "http://localhost:3002/api/",
  // BASE_URL: 'https://notion-be.herokuapp.com/api/',
  AUTH_ADMIN_LOGIN: `${BASE_URL}admin/adminLogin`,
  AUTH_API_URL: `${BASE_URL}user/userLogin`,
  DYNAMIC_LINKS: `${BASE_URL}workspacePage/fetchMappingByUser`,
  REGISTER_API: `${BASE_URL}auth/user/register`,
  GET_PRODUCT_API_URL: `${BASE_URL}/user/getproduct`,
  SUPPORT_API: `${BASE_URL}user/contact_customer_support`,
  GET_TABLE: `${BASE_URL}user/fetchTableById`,
  CREATROW: `${BASE_URL}table/createRow`,
  UPDATECELL: `${BASE_URL}table/updateCell`,
  DELETEROW: `${BASE_URL}table/deleteRow`,
  GETUSERS: `${BASE_URL}user/getUsers`,
  ADDUSER: `${BASE_URL}user/addUser`,
  UPDATEUSER: `${BASE_URL}user/updateUser`,
  DELETEUSER: `${BASE_URL}user/deleteUser`,
  GETWORKSPACEPAGES: `${BASE_URL}workspacePage/getWorkSpacePages`,
  DELETEWORKSPACEPAGE: `${BASE_URL}workspacePage/deleteWorkSpacePage`,
  ADDWORKSPACEPAGES: `${BASE_URL}workspacePage/addWorkSpacePage`,
  UPDATEWORKSPACEPAGE: `${BASE_URL}workspacePage/updateWorkSpacePage`,
  UPDATENOTIONTOKEN: `${BASE_URL}admin/updateNotionToken`,
  REMOVEPAGEACCESS: `${BASE_URL}workspacePage/removePageAccess`,
  FETCHPAGEBYID: `${BASE_URL}user/fetchPageById`,
  FETCHTABLEBYID: `${BASE_URL}user/fetchTableById`,
  CREATEROW: `${BASE_URL}table/createRow`,
  FETCHMAPPING: `${BASE_URL}workspacePage/fetchMapping`,
  CREATEPAGEMAP: `${BASE_URL}workspacePage/createPageMap`,
  UPLOAD_IMAGE: `${BASE_URL}image/uploadImage/`,
  SYNC_SCHEMA: `${BASE_URL}schema/createSchema`,
  FETCH_SCHEMA: `${BASE_URL}schema/fetchSchema`,
  FETCH_FORM: `${BASE_URL}schema/fetchForm`,
  CREATEFORM: `${BASE_URL}schema/createForm`,
};

export const APP_BASE_URL = config.BASE_URL;
