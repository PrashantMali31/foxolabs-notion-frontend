/* eslint-disable react/jsx-key */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import {
  AppAdminSidebar,
  AppFooter,
  AppHeader,
} from "../../../components/index";
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormInput,
  CFormSwitch,
} from "@coreui/react";
import Select from "react-select/creatable";
import { useSnackbar } from "react-simple-snackbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { config } from "../../../config";

function EmbeddedForm() {
  const location = useLocation();
  const pageCode = location.state.pageId;
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [title, setTitle] = useState("");
  const user = localStorage.getItem("admin_token");
  const userJson = JSON.parse(user);
  const [selectedField, setSelectedField] = useState([]);
  const token = userJson.token;
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    getPages();
  }, []);

  const getPages = () => {
    setIsLoading(true);
    (async () => {
      const res = await axios.get(config.FETCH_SCHEMA + "/" + pageCode, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.status === 200) setColumns(res.data?.data);
    })()
      .catch(console.err)
      .finally(() => setIsLoading(false));
  };
  const handleCheckSelect = (event, data) => {
    let temp = JSON.parse(JSON.stringify(selectedField));
    const exist = temp.includes(data);
    if (exist) {
      temp = temp.filter((x) => x !== data);
    } else {
      temp.push(data);
    }
    setSelectedField(temp);
  };

  const saveForm = async () => {
    const data = {
      title: title,
      pageId: pageCode,
      fields: selectedField,
    };
    console.log("data", data);
    // return 0;
    const res = await axios.post(config.CREATEFORM + "/" + pageCode, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("res", res);
    if (res.status === 200) {
      openSnackbar("Form created successfully!!");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <div>
      <AppAdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader currentPagePath="Create Embed Form" />
        <div className="body flex-grow-1 w-30 px-5">
          <CContainer>
            <CRow>
              <CCol sm="3" style={{ marginBottom: 15 }}>
                <span className="h6">Form Title</span>

                <CFormInput
                  type="email"
                  id="exampleFormControlInput1"
                  value={title}
                  placeholder="Form Title"
                  onChange={(event) => {
                    setTitle(event?.target?.value);
                  }}
                  // text="Must be 8-20 characters long."
                  aria-describedby="exampleFormControlInputHelpInline"
                />
              </CCol>
            </CRow>
            <hr />
            <CRow>
              {columns?.length > 0
                ? columns?.map((item, index) => {
                    let options = [];
                    if (item.fieldType === "multi_select") {
                      item?.optionTable?.map((option) => {
                        options.push({
                          label: option.value,
                          value: option.value,
                        });
                        return option;
                      });
                    }
                    return (
                      <CCol sm="6" md="3" style={{ marginBottom: 10 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span className="h6">{`${item?.fieldName} (${item?.fieldType})`}</span>
                          <CFormSwitch
                            id={item?.fieldName}
                            label=""
                            checked={selectedField.includes(item._id)}
                            onClick={(event) =>
                              handleCheckSelect(event, item._id)
                            }
                          />
                        </div>
                        {item?.fieldType === "multi_select" ? (
                          <Select
                            // value={selected}
                            // onChange={onChange}
                            style={{ width: "100%" }}
                            options={options}
                            isMulti
                            isSearchable
                          />
                        ) : (
                          <CFormInput
                            type="email"
                            id="exampleFormControlInput1"
                            // label={`${item?.fieldName} (${item?.fieldType})`}
                            placeholder=""
                            // text="Must be 8-20 characters long."
                            aria-describedby="exampleFormControlInputHelpInline"
                          />
                        )}
                      </CCol>
                    );
                  })
                : null}
            </CRow>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <CButton color="primary" onClick={saveForm}>
                Create Form
              </CButton>
            </div>
          </CContainer>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default EmbeddedForm;
