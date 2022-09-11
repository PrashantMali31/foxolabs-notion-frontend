import React, {useContext, useEffect, useState} from "react";
import {
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import {AppAdminSidebar, AppFooter, AppHeader, } from "../../../components/index"
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {config} from "../../../config";
import axios from "axios";
import {toast} from "react-toastify";
import {CButton} from "@coreui/react";
import AddUser from "./AddUser";
import * as alertify from "alertifyjs";
import UpdateUser from "./UpdateUser";
import {CSpinner} from "@coreui/react";
import jwt_decode from "jwt-decode";

export const Users = () => {
  const currentPagePath = "Users";
  const user = localStorage.getItem("admin_token");
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const userData = jwt_decode(token);
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rowUserTemplates, setRowUserTemplates] = useState([
    {
      fullName: "",
      username: "",
      emailid: "",
    },
  ]);
  const [updateForm, setUpdateForm] = useState({
    id: "",
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [columnUserTemplate] = useState([
    {field: "fullName", sortable: true, filter: true},
    {field: "username", sortable: true, filter: true},
    {field: "email", sortable: true, filter: true},
    {field: "id", hide: true},
    {
      headerName: "Action",
      field: "notes",
      editable: true,
      cellRenderer: function (params) {
        return (
          <div className="d-flex flex-row gap-3 adminTableIconbox ">
            <TrashIcon
              className="text-red-500 w-4 h-4 cursor-pointer self-center adminTableIcon"
              style={{color: "red"}}
              onClick={() => {
                deleteUser({id: params.data.id});
              }}
            />
            <PencilIcon
              className="text-blue-500 w-4 h-4 cursor-pointer adminTableIcon"
              style={{color: "blue"}}
              onClick={() => {
                editUser({data: params.data})
              }}
            />
          </div>
        );
      },
    },
  ]);

  const getUsers = () => {
    setLoading(true);
    (async () => {
      const res = await axios.get(
        `${config.GETUSERS}/${userData.user[0].workspaceId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const userDataArray = [];
      res.data.data.map((data, i) => {
        const userData = {
          id: data._id,
          fullName: data.fullName,
          username: data.username,
          email: data.email,
        };
        userDataArray.push(userData);
      });
      setRowUserTemplates(userDataArray);
    })()
      .catch(console.err)
      .finally(() => setLoading(false));
  };



  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = ({id}) => {

    alertify.confirm("Are you sure ?",
      function () {
        setLoading(true);
        (async () => {
          await axios.get(
            config.DELETEUSER + "/" + id,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          toast("Deleted Successfully");
          getUsers();
        })()
          .catch(console.err)
          .finally(() => setLoading(false));
        alertify.success("User Deleted");
      },
      function () {
        alertify.error("Cancel");
      });
  };

  const editUser = ({data}) => {
    setVisibleUpdate(!visibleUpdate)
    setUpdateForm({
      id: data.id,
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      password: data.password,
    });

  };

  return (
    <>


      {loading ? (
        <div className='d-flex  p-3 ' style={{justifyContent: "center", alignItems: "center"}}><CSpinner color="#3c4b64" /></div>
      ) : (
        <div>
          <AppAdminSidebar />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader currentPagePath={currentPagePath} />
            <div className="body flex-grow-1 px-3">
              <AddUser visible={visible} setVisible={setVisible} setRowUserTemplates={setRowUserTemplates} getUsers={getUsers} />
              <UpdateUser visibleUpdate={visibleUpdate} setVisibleUpdate={setVisibleUpdate} updateForm={updateForm} setUpdateForm={setUpdateForm} getUsers={getUsers} />
              <div className="buttonBox p-3 " >
                <CButton color="primary" onClick={() => setVisible(!visible)}>Add New User</CButton>
              </div>
              <div
                className="ag-theme-alpine"
                style={{height: "65vh", width: "100%"}}
              >
                <AgGridReact
                  rowData={rowUserTemplates}
                  columnDefs={columnUserTemplate}
                />
              </div>
            </div>

            <AppFooter />

          </div>
        </div>
      )}

    </>
  );
};

export default Users;
