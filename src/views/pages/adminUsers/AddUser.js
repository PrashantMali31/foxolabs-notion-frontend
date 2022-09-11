import React, { useContext, useState } from "react";

import { config } from "../../../config";
import  axios  from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { CButton } from "@coreui/react";
import { CForm, CFormInput } from "@coreui/react"
import { CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter } from "@coreui/react";
import { validateYup } from "src/validateYup";

import jwt_decode from "jwt-decode";

export const AddUser = ({ visible,setVisible , getUsers }) => {

  const user = localStorage.getItem("admin_token");
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const userData = jwt_decode(token);

  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const add = () => {
    let schema = yup.object().shape({
      fullName: yup.string().trim().required("Required"),
      username: yup.string().trim().required("Required"),
      email: yup.string().trim().required("Required"),
      password: yup.string().trim().required("Required"),
    });
    let finalObj = {
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      password: form.password,
      workspaceId: userData.user[0].workspaceId,
    };
    validateYup(schema, finalObj)
      .then(() => {
        setErrors({});
        setIsLoading(true);
        (async () => {
          await axios.post(
            config.ADDUSER,
            finalObj,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          getUsers();
          toast("Added Successfully");
          setVisible(false);
          setForm({
            fullName: "",
            username: "",
            email: "",
            password: "",
          });
        })()
          .catch(console.err)
          .finally(() => setIsLoading(false));
      })
      .catch(setErrors);
  };

  return (
    <div className="formbox">
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>ADD USER</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            <>
              <CFormInput 
                type="text"
                label={"Full Name"}
                id="au-fullName"
                name="au-fullName"
                placeholder="Enter fullName..."
                autoComplete="fullName"
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </>
            <>
              <CFormInput 
                type="text"
                label={"Username"}
                id="au-username"
                name="au-username"
                placeholder="Enter Username..."
                autoComplete="current-username"
                onChange={(e) => setForm({ ...form,  username: e.target.value  })}
              />
            </>
            <>
              <CFormInput 
                type="email"
                label={"Email"}
                id="au-email"
                name="au-email"
                placeholder="Enter Email.."
                autoComplete="email"
                onChange={(e) => setForm({ ...form, email: e.target.value})}
              />
            </>
            <>
              <CFormInput 
                type="password"
                label={"Password"}
                id="au-password"
                name="au-password"
                placeholder="Enter Password.."
                autoComplete="current-password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
          </CButton>
          <CButton onClick={add}>Add User</CButton>
        </CModalFooter>
      </CModal>
    
    </div>
    

  );
};

export default AddUser;
