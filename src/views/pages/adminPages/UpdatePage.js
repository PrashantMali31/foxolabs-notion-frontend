import React, { useContext, useState } from "react";

import { config } from "../../../config";
import  axios  from "axios";
import { toast } from "react-toastify";
import * as yup from "yup";
import { CButton } from "@coreui/react";
import { CForm,  CFormInput,  } from "@coreui/react"
import { CModal,CModalHeader,CModalTitle,CModalBody,CModalFooter } from "@coreui/react";
import { validateYup } from "src/validateYup";

export const UpdatePage = ({
  onUpdatePage,
  visiblePageUpdate,
  setVisiblePageUpdate,
  updatePageForm,
  setUpdatePageForm,
  getPages
}) => {

  const user = localStorage.getItem("admin_token");
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});


  const update = () => {
    let schema = yup.object().shape({
      pageName: yup.string().trim().required("Required"),
      pageCode: yup.string().trim().required("Required"),
    });
    let finalObj = {
      id: updatePageForm.id,
      pageName: updatePageForm.pageName,
      pageCode: updatePageForm.pageCode
     
    
    };
    validateYup(schema, finalObj)
      .then(() => {
        setErrors({});
        setLoading(true);
        (async () => {
          await axios.post(
            config.UPDATEWORKSPACEPAGE,
            finalObj,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          getPages();
          toast("Updated Successfully");
          onUpdatePage?.();
        })()
          .catch(console.err)
          .finally(() => setLoading(false));
      })
      .catch(setErrors);
    console.log("object");
    setVisiblePageUpdate(false)
      
  };

  React.useEffect(() => {
    setUpdatePageForm({
      ...updatePageForm,
      pageName: updatePageForm.pageName,
      pageCode: updatePageForm.pageCode,
    });
  }, []);

  return (
    <div className="formbox">
      <CModal visible={visiblePageUpdate} onClose={() => setVisiblePageUpdate(false)}>
        <CModalHeader onClose={() => setVisiblePageUpdate(false)}>
          <CModalTitle>UPDATE PAGE</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            <>
              
              <CFormInput 
                name="name"
                error={errors?.pageName}
                value={updatePageForm.pageName}
                label={"Page Name"}
                placeholder={"Name"}
                onChange={(e) => setUpdatePageForm({ ...updatePageForm, pageName: e.target.value })}
              />
            </>
            <>
              <CFormInput 
                name="pageid"
                error={errors?.pageCode}
                value={updatePageForm.pageCode}
                label={"Page Code"}
                placeholder={"Page Id"}
                onChange={(e) => setUpdatePageForm({ ...updatePageForm, pageCode: e.target.value })}
              />
            </>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisiblePageUpdate(false)}>
      Close
          </CButton>
          <CButton onClick={update}>Update Page</CButton>
        </CModalFooter>
      </CModal>

    </div>
  );
};

export default UpdatePage;
