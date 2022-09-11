import React, { useContext, useState } from "react";

import { config } from "../../../config";
import axios  from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { validateYup } from "src/validateYup";
import { CButton } from "@coreui/react";
import { CForm,  CFormInput,  } from "@coreui/react"
import { CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter } from "@coreui/react";

import jwt_decode from "jwt-decode";

export const UpdateUser = (
  { 
    visibleUpdate,
    setVisibleUpdate,
    updateForm,
    setUpdateForm,
    getUsers  }) => {
  const user = localStorage.getItem("admin_token");
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const userData = jwt_decode(token);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const update = () => {
    let schema = yup.object().shape({
      fullName: yup.string().trim().required("Required"),
      username: yup.string().trim().required("Required"),
      email: yup.string().trim().required("Required"),
      password: yup.string().trim().required("Required"),
    });
    let finalObj = {
      id: updateForm.id,
      fullName: updateForm.fullName,
      username: updateForm.username,
      email: updateForm.email,
      password: updateForm.password,
      workspaceId: userData.user[0].workspaceId
    };
    validateYup(schema, finalObj)
      .then(() => {
        setErrors({});
        setIsLoading(true);
        (async () => {
          const res = await axios.post(
            config.UPDATEUSER,
            finalObj,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          getUsers();
          toast("Updated Successfully");
          setVisibleUpdate(!visibleUpdate);
        })()
          .catch(console.err)
          .finally(() => setIsLoading(false));
      })
      .catch(setErrors);
    setIsLoading(true);



  };

  React.useEffect(() => {
    setUpdateForm({
      ...updateForm,
      fullName: updateForm.fullName,
      username: updateForm.username,
      email: updateForm.email,
      password: updateForm.password,
    });
  }, []);

  return (
   
      
    <div className="formbox">
      <CModal visible={visibleUpdate} onClose={() => setVisibleUpdate(false)}>
        <CModalHeader onClose={() => setVisibleUpdate(false)}>
          <CModalTitle>UPDATE USER</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            <>
              <CFormInput 
                name="fullname"
                error={errors?.fullName}
                value={updateForm.fullName}
                label={"fullName"}
                placeholder={"fullName"}
                onChange={(e) => setUpdateForm({ ...updateForm, fullName: e.target.value })}
              />
            </>
            <>
              <CFormInput 
                name="username"
                error={errors?.username}
                value={updateForm.username}
                label={"Username"}
                placeholder={"Username"}
                onChange={(e) => setUpdateForm({ ...updateForm, username: e.target.value })}
              />
            </>
            <>
              <CFormInput 
                name="email"
                error={errors?.email}
                value={updateForm.email}
                label={"Email Id"}
                placeholder={"Email Id"}
                onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
              />
            </>
            <>
              <CFormInput 
                name="password"
                error={errors?.password}
                value={updateForm.password}
                label={"Password"}
                placeholder={"Password"}
                onChange={(e) => setUpdateForm({ ...updateForm, password: e.target.value })}
              />
            </>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleUpdate(false)}>
            Close
          </CButton>
          <CButton onClick={update}>Update User</CButton>
        </CModalFooter>
      </CModal>

    </div>
  );
};

export default UpdateUser;
