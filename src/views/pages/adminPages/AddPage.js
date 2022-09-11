import React, { useContext, useState } from "react";
import { config } from "../../../config";
import axios  from "axios";
import { toast } from "react-toastify";
import { CButton } from "@coreui/react";
import { CForm, CFormInput } from "@coreui/react"
import { CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter } from "@coreui/react";
import * as yup from "yup";
import jwt_decode from "jwt-decode";
import { validateYup } from "src/validateYup";
import { CSpinner } from "@coreui/react";
export const AddPage = ({ onAddPage, visible, setVisible,getPages }) => {
  const user = localStorage.getItem("admin_token");
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const userData = jwt_decode(token);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    pageName: "",
    pageCode: "",
  });

  const add = () => {
    let schema = yup.object().shape({
      pageName: yup.string().trim().required("Required"),
      pageCode: yup.string().trim().required("Required"),
    });
    let finalObj = {
      pageName: form.pageName,
      pageCode: form.pageCode,
      workspaceId: userData.user[0].workspaceId,
    };
    validateYup(schema, finalObj)
      .then(() => {
        setErrors({});
        setLoading(true);
        (async () => {
          const res = await axios.post(
            config.ADDWORKSPACEPAGES,
            finalObj,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          getPages();
          toast("Added Successfully");
          setForm({
            pageName: "",
            pageCode: "",
          });
          onAddPage?.();
        })()
          .catch(console.err)
          .finally(() => setLoading(false));
      })
      .catch(setErrors);
    loading ? "loading" : setVisible(false);
  };


  return (
   
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>ADD Page</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm action="" method="post">
          <>
            <CFormInput 
              name="name"
              error={errors?.pageName}
              value={form.pageName}
              label={"Page Name"}
              placeholder={"Name"}
              id="ap-name"
              onChange={(e) => setForm({ ...form, pageName: e.target.value })}
            />
          </>
          <>
            <CFormInput 
              name="pageid"
              error={errors?.pageCode}
              value={form.pageCode}
              label={"Page Id"}
              id="ap-pageid"
              placeholder={"Page Id"}
              onChange={(e) => setForm({ ...form, pageCode: e.target.value })}
            />
          </>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
        </CButton>
        <CButton onClick={add}>Add Page</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddPage;
