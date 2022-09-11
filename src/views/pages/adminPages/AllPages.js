import React, {useContext, useEffect, useState} from "react";
import {
  TrashIcon,
  ShareIcon,
  PencilIcon,
  RefreshIcon,
  DocumentIcon
} from "@heroicons/react/outline";
import {AppContent, AppAdminSidebar, AppFooter, AppHeader, } from "../../../components/index";
import {CButton} from "@coreui/react";
import {config} from "../../../config";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import {toast} from "react-toastify";
import {CSpinner} from "@coreui/react";
import jwt_decode from "jwt-decode";
import AddPage from "./AddPage";
import * as alertify from "alertifyjs";
import UpdatePage from "./UpdatePage";
import {useSnackbar} from "react-simple-snackbar"
import Columns from "./ColumnsComponent";
import {useNavigate} from "react-router-dom";

export const AllPages = () => {
  const currentPagePath = "All Pages";
  const [visible, setVisible] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [visiblePageUpdate, setVisiblePageUpdate] = useState(false);
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const navigate = useNavigate();
  const user = localStorage.getItem("admin_token");
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const userData = jwt_decode(token);

  const [isLoading, setIsLoading] = useState(false);
  const [syncing, setSycning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [columns, setColumns] = useState([]);
  const [updatePageForm, setUpdatePageForm] = useState({
    id: "",
    pageName: "",
    pageCode: "",
    workspaceId: "",
    columns: []
  });
  const [rowPageTemplates, setRowPageTemplates] = useState([
    {
      pageName: "",
      pageCode: "",
      numOfColumns: "",
    },
  ]);

  useEffect(() => {
    getPages();
  }, []);


  const [columnPageTemplate] = useState([
    {field: "pageName", sortable: true, filter: true},
    {field: "pageCode", sortable: true, filter: true},
    {
      field: "numOfColumns", sortable: true, filter: true,
      cellRenderer: function (params) {
        setColumns(params?.data?.columns)
        return (
          <CButton color="default" onClick={() => setShowColumns(!showColumns)}>
            <span className="text-info">{params?.data?.numOfColumns?.toString()}</span>
          </CButton>
        );
      },
    },
    {field: "id", hide: true},
    {
      headerName: "Action",
      field: "notes",
      cellRenderer: function (params) {
        return (
          <div className="d-flex flex-row  adminTableIconbox ">
            <TrashIcon
              className="text-red-500 w-4 h-4 cursor-pointer self-center adminTableIcon"
              style={{color: "red", marginRight: "8px"}}
              onClick={() => {
                deletePage({id: params.data.id});
                setIsModalVisible(true);
              }}
            />
            <PencilIcon
              className="text-red-500 w-4 h-4 cursor-pointer self-center adminTableIcon"
              style={{color: "blue"}}
              onClick={() => editPage({data: params.data})}
            />

            <RefreshIcon
              className="text-blue-500 w-4 h-4 cursor-pointer adminTableIcon"
              style={{color: "red", marginLeft: "8px"}}
              onClick={() => handleSync(params.data?.pageCode)}
            />



            <DocumentIcon
              className="text-success w-4 h-4 cursor-pointer adminTableIcon"
              style={{color: "red", marginLeft: "8px"}}
              onClick={() => handleForm(params.data?.pageCode)} />
          </div>
        );
      },
    },
  ]);

  const handleForm = (pageCode) => {
    navigate("/embeddedForm/12", {state: {pageId: pageCode}})
  }

  const getPages = () => {
    setIsLoading(true);
    (async () => {
      const res = await axios.get(
        config.GETWORKSPACEPAGES + "/" + userData.user[0].workspaceId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const pageDataArray = [];
      res.data.data.map((data, i) => {
        const pageData = {
          id: data._id,
          pageName: data.pageName,
          pageCode: data.pageCode,
          numOfColumns: data.numOfColumns,
          workspaceId: data.workspace,
          columns: data?.columns
        };
        pageDataArray.push(pageData);
      });
      setRowPageTemplates(pageDataArray);
    })()
      .catch(console.err)
      .finally(() => setIsLoading(false));
  };


  const handleSync = async (pageid) => {

    setSycning(true)
    const res = await axios.get(
      config.SYNC_SCHEMA + "/" + pageid,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.status === 200) {
      openSnackbar(res?.data?.message)
      setTimeout(() => {
        getPages()
      }, 1000)

    }
    setSycning(false)


  }



  const deletePage = ({id}) => {

    alertify.confirm("Are you sure?",
      function () {
        setIsModalVisible(false);
        setIsLoading(true);
        (async () => {
          await axios.get(
            config.DELETEWORKSPACEPAGE + "/" + id,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          toast("Deleted Successfully");
          getPages();
        })()
          .catch(console.err)
          .finally(() => setIsLoading(false));
        alertify.success("Ok");
      },
      function () {
        alertify.error("Cancel");
      });
  };

  const editPage = ({data}) => {
    setVisiblePageUpdate(!visiblePageUpdate);
    setUpdatePageForm({
      id: data.id,
      pageName: data.pageName,
    })
  };

  return (
    <>

      {isLoading ? (
        <div className='d-flex  p-3 ' style={{justifyContent: "center", alignItems: "center"}}><CSpinner color="#3c4b64" /></div>
      ) : (
        <div>
          <AppAdminSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader currentPagePath={currentPagePath} />
            <div className="body flex-grow-1 px-3">
              <div className="buttonBox p-3 " >
                <CButton color="primary" onClick={() => setVisible(!visible)}>Add New Page</CButton>
              </div>
              <div
                className="ag-theme-alpine"
                style={{height: "50vh", width: "100%"}}
              >
                <AgGridReact
                  rowData={rowPageTemplates}
                  columnDefs={columnPageTemplate}
                  onGridReady={(params) => {
                    params.api.sizeColumnsToFit();
                  }}
                />
              </div>
              <UpdatePage visiblePageUpdate={visiblePageUpdate} setVisiblePageUpdate={setVisiblePageUpdate} updatePageForm={updatePageForm} setUpdatePageForm={setUpdatePageForm} getPages={getPages} />
              <AddPage visible={visible} setVisible={setVisible} getPages={getPages} />
              <Columns visible={showColumns} setVisible={setShowColumns} columns={columns} />
              {
                syncing &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, right: 0, zIndex: 9999}}><CSpinner color="success" variant="grow" /></div>
              }
              <AppFooter />
            </div>

          </div>
        </div>
      )}

    </>
  );
};

export default AllPages;
