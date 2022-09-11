import React, {useEffect, useState, useContext, useCallback} from "react";
import {config} from "../../config";
import axios from "axios";
import {AuthContext} from "../../context/auth.context";
import {CButton, CForm, } from "@coreui/react";
import {CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, } from "@coreui/react";
import _ from "lodash";
import jwt_decode from "jwt-decode";
import _debounce from "lodash/debounce";
import DynamicImageField from "./DynamicImageField";
import DynamicInputField from "./DynamicInputField";

function AddDynamicFields({
  updateFieldVisible,
  selectedData,
  columns,
  setUpdateFieldVisible,
  updateCell,
  schema,
}) {

  // const [columns, setColumns] = useState([]);

  const user = localStorage.getItem("token");
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const userData = jwt_decode(token);
  const fileRef = React.useRef(null);
  const {auth, setAuth} = useContext(AuthContext);
  const passData = auth.passData?.lastRowData;
  const [formFields, setFormFields] = useState([]);
  const [selected, setSelected] = useState([{label: "Grapes 🍇", value: "grapes"}]);


  return (

    <div className="formbox">
      <CModal visible={updateFieldVisible} onClose={() => setUpdateFieldVisible(false)}>
        <CModalHeader onClose={() => setUpdateFieldVisible(false)}>
          <CModalTitle>Edit Row</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm >
            {columns?.map((form, index) => {
              var dataValue = "";
              if (form === "id") {
                dataValue = selectedData[form];
                return null
              } else if (form === "space_id") {
                dataValue = selectedData[form];
                return null
              } else {
                dataValue = "";
              }
              const value = selectedData[form]
              const otherData = value //? value.split("--") : [""];


              return (
                <DynamicInputField
                  columns={columns}
                  handleFormChange={(event, cellType) => updateCell(event, cellType)}
                  otherData={otherData}
                  dataValue={formFields}
                  index={index}
                  setFormFields={setFormFields}
                  formFields={formFields}
                  selected={selected}
                  schema={schema}
                  setSelected={setSelected}
                />
              );
            })}
            <CModalFooter>
              <CButton color="secondary" onClick={() => setUpdateFieldVisible(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

    </div >
  );
}
export default AddDynamicFields;
