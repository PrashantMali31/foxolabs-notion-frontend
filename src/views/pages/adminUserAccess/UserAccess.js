import React, {useEffect, useState} from "react";
import {
  CollectionIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {config} from "../../../config";
import axios from "axios";
import {AppAdminSidebar, AppFooter, AppHeader, } from "../../../components/index";
import {CButton} from "@coreui/react";
import jwt from "jwt-decode";
import {CSpinner} from "@coreui/react";
import Draggable from "react-draggable";
import AddPageAccess from "./AddPageAccess";

export const UserAccess = () => {
  const currentPagePath = "Users Access"
  const [loading, setLoading] = useState(false);
  const [visibleAddAccess, setVisibleAddAccess] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowUserTemplates, setRowUserTemplates] = useState([
    {
      PageName: "Dashboard",
      PageCode: "Dashboard-01",
      User: "Prashant",
    },
  ]);

  const [columnUserTemplate] = useState([
    {field: "id", hide: true, sortable: true, filter: true},
    {field: "pageName", sortable: true, filter: true},
    {field: "fullName"},
    {
      headerName: "Action",
      field: "notes",
      editable: true,
      cellRenderer: function (params) {
        return (
          <div className="flex flex-row gap-3">
            <TrashIcon
              className="text-red-500 w-4 h-4 cursor-pointer self-center adminTableIcon"
              style={{color: "red"}}
              onClick={() => {
                handleClickOpen();
                setSelectedRecord(params.data);
                handleRemoveAccess();
              }}
            />
          </div>
        );
      },
    },
  ]);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveAccess = async () => {
    const user = localStorage.getItem("userInfo");
    if (!user) return false;
    const userJson = JSON.parse(user);
    const token = userJson.data.token;
    const url = `${config.REMOVEPAGEACCESS}/${selectedRecord.id}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      getMapping();
    }
    handleClose(false);
  };
  const getMapping = async () => {
    setLoading(true);
    const user = localStorage.getItem("admin_token");
    if (!user) return false;
    const userJson = JSON.parse(user);
    const token = userJson.token;
    const userData = jwt(token);
    const workspaceId = userData.user[0]?.workspaceId;
    const url = `${config.FETCHMAPPING}/${workspaceId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });



    if (res.status === 200) {
      const userDataArray = [];

      res.data.data.map((data, i) => {
        const userData = {
          id: data._id,
          fullName: data.mapping[0].fullName,
          pageCode: data.mapping[0].pageCode,
          pageName: data.mapping[0].pageName,
        };
        userDataArray.push(userData);
        return data;
      });
      setRowUserTemplates(userDataArray);
    } else {
      setRowUserTemplates([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    getMapping();

  }, []);

  return (
    <>

      <div>
        <AppAdminSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader currentPagePath={currentPagePath} />
          <div className="body flex-grow-1 px-3">
            <div className="buttonBox p-3 " >
              <CButton color="primary" onClick={() => setVisibleAddAccess(!visibleAddAccess)}>Add New Access</CButton>
            </div>
            <div
              className="ag-theme-alpine"
              style={{height: "70vh", width: "100%"}}
            >
              <AgGridReact style={{height: 600}}
                rowData={rowUserTemplates}
                columnDefs={columnUserTemplate}
              />
            </div>
            <AddPageAccess visibleAddAccess={visibleAddAccess} setVisibleAddAccess={setVisibleAddAccess} getMapping={getMapping} />
            <AppFooter />
          </div>

        </div>
        {loading ? (
          <div className='d-flex  p-3 ' style={{justifyContent: "center", alignItems: "center"}}><CSpinner color="#3c4b64" /></div>
        ) : null}
      </div>


    </>
  );
};

export default UserAccess;
