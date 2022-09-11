import React, {useContext, useEffect, useState} from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {config} from "../../../config";
import axios from "axios";
import {toast} from "react-toastify";
import {CButton, CFormInput} from "@coreui/react";
import * as yup from "yup";
import {validateYup} from "src/validateYup";
// import Modal from "../../components/atoms/modal.atom";
import {CSpinner} from "@coreui/react";
import jwt_decode from "jwt-decode";
import {AppAdminSidebar, AppFooter, AppHeader, } from "../../../components/index"

export const Notiontoken = () => {
  const currentPagePath = "Notion Token";
  const user = localStorage.getItem("admin_token");
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const userData = jwt_decode(token);

  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    notionToken: "",
  });


  const update = () => {
    let schema = yup.object().shape({
      notionToken: yup.string().trim().required("Required"),
    });
    let finalObj = {
      notionToken: form.notionToken,
    };
    validateYup(schema, finalObj)
      .then(() => {
        setErrors({});
        setLoading(true);
        (async () => {
          await axios.post(
            config.UPDATENOTIONTOKEN + "/" + userData.user[0]._id,
            finalObj,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          toast("Updated Successfully");
        })()
          .catch(console.err)
          .finally(() => setLoading(false));
      })
      .catch(setErrors);
  };


  React.useEffect(() => {
    setForm({
      ...form,
      notionToken: userData.user[0].notionToken,
    });
  }, []);


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

              <div className="flex flex-row gap-6">
                <CFormInput
                  name="notionToken"
                  error={errors?.notionToken}
                  value={form.notionToken}
                  label={"Notion Token"}
                  placeholder={"Notion Token"}
                  onChange={(e) => setForm({...form, notionToken: e.target.value})}
                />

                <div className="flex-1 mt-2">
                  &nbsp;
                  {loading ? (
                    <CButton className="w-full bg-red-100 text-black pointer-events-none">
                      Loading
                    </CButton>
                  ) : (
                    <CButton className=" w-full pl-5 pr-5" onClick={update}>
                      Update
                    </CButton>
                  )}
                </div>
              </div>
              <AppFooter />
            </div>

          </div>
        </div>
      )}

    </>
  );
};

export default Notiontoken;
