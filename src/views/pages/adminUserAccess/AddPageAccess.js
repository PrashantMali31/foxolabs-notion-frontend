import React, {useState, useEffect} from "react";
import {config} from "../../../config";
import axios from "axios";
import {toast} from "react-toastify";
import {CButton} from "@coreui/react";
import {CForm, } from "@coreui/react"
import {CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter} from "@coreui/react";
import jwt_decode from "jwt-decode";

import jwt from "jwt-decode";
import {CFormSelect} from "@coreui/react";

export const AddPageAccess = ({
  visibleAddAccess,
  setVisibleAddAccess,
  getMapping,
  isUser = true
}) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);

  const [loading, setLoading] = React.useState(false);

  const getUsers = async () => {
    setLoading(true);
    const user = localStorage.getItem("admin_token");
    if (!user) return false;
    const userJson = JSON.parse(user);
    const token = userJson.token;
    const userData = jwt_decode(token);
    const workspaceId = userData.user[0]?.workspaceId;
    const url = `${config.GETUSERS}/${workspaceId}`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });



    if (res.status === 200) {
      setUsers(res.data.data);
    } else {
      setUsers([]);
    }
  };

  const getPages = async () => {
    const user = localStorage.getItem("admin_token");
    if (!user) return false;
    const userJson = JSON.parse(user);
    const token = userJson.token;
    const userData = jwt(token);
    const workspaceId = userData.user[0]?.workspaceId;
    const url = `${config.GETWORKSPACEPAGES}/${workspaceId}`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setPages(res.data.data);
    } else {
      setPages([]);
    }

  };


  useEffect(() => {
    getUsers();
    getPages();

  }, []);

  const add = async () => {
    setLoading(true);
    const user = localStorage.getItem("admin_token");
    if (!user) return false;
    const userJson = JSON.parse(user);
    const token = userJson.token;
    const userData = jwt(token);
    const workspaceId = userData.user[0]?.workspaceId;

    if (!selectedUsers) return false;
    if (!selectedPages.length === 0) return false;

    const data = {
      userid: selectedUsers,
      pageids: [selectedPages],
      workspaceid: workspaceId,
    };



    const res = await axios.post(config.CREATEPAGEMAP, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("create map", res);
    if (res.status === 200) {
      toast("Added Successfully");
      setVisibleAddAccess(false);
      getUsers();
      getPages();
      getMapping();
    }
    setLoading(false);
  };


  return (


    <div className="formbox">
      <CModal visible={visibleAddAccess} onClose={() => setVisibleAddAccess(false)}>
        <CModalHeader onClose={() => setVisibleAddAccess(false)}>
          <CModalTitle>ADD ACCESS</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            {
              isUser && (<>
                <CFormSelect aria-label="Default select " style={{marginBottom: 25}}
                  onChange={(e) => {setSelectedUsers(e.target.value)}}
                >
                  <option>Please Select User</option>
                  {
                    users.map((item) => {

                      return <option value={item._id} key={item._id}>{item.username}</option>
                    })
                  }
                </CFormSelect>
              </>)
            }

            <>
              <CFormSelect aria-label="Default select example"
                onChange={(e) => setSelectedPages(e.target.value)}
              >
                <option>Please Select Pages</option>
                {
                  pages.map((item) => {
                    return <option value={item._id} key={item._id}>{item.pageName}</option >

                  })
                }
              </CFormSelect>
            </>

          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAddAccess(false)}>
            Close
          </CButton>
          <CButton onClick={add}>Add User</CButton>
        </CModalFooter>
      </CModal>

    </div>
  );
};

export default AddPageAccess;
