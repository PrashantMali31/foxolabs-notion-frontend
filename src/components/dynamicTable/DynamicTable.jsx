import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { config } from "../../config";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { CSpinner } from "@coreui/react";
import { CButton } from "@coreui/react";
import { CTable } from "@coreui/react";
import { CTableBody } from "@coreui/react";
import { CTableHead } from "@coreui/react";
import { CTableHeaderCell } from "@coreui/react";
import { CTableRow } from "@coreui/react";
import { CTableDataCell } from "@coreui/react";
import AddDynamicFields from "./AddDynamicFields";
import * as alertify from "alertifyjs";
import CIcon from "@coreui/icons-react";
import { cilPenNib, cilTrash } from "@coreui/icons";
// import _ from 'loadash'

function DynamicTable({ selectedTab }) {
  const data = selectedTab;
  const user = localStorage.getItem("token");
  const parsedData = JSON.parse(user);
  const userData = jwt_decode(user);
  const id = userData.user[0]?._id;
  const pageData = data;
  const [updateFieldVisible, setUpdateFieldVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [schema, setSchema] = useState(null);
  const [lastRow, setLastRow] = useState([]);
  const [parentId, setParentId] = useState();
  const [tableId, setTableId] = useState();
  const [selectedData, setSelectedData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [isNewAdding, setIsNewAdding] = useState(false);
  const userJson = JSON.parse(user);
  const token = userJson.token;
  const getTableInfo = (id, pageData, from = "home") => {
    if (from === "home") setLoading(true);
    (async () => {
      if (pageData?.pageCode) {
        const res = await axios.get(
          config.GET_TABLE + "/" + id + "/" + pageData?.pageCode,
          {
            headers: {
              Authorization: "Bearer " + parsedData.token,
            },
          }
        );
        setDataTable(res.data.data);
        setSchema(res.data.schema);
        setParentId(res.data.parentId);
        setTableId(res.data.tableId);
        setLastRow(() => dataTable[dataTable.length - 1]);
      }
    })()
      .catch(console.err)
      .finally(() => setLoading(false));
  };

  const getTableInfoAfterUpdate = (id, pageData) => {
    (async () => {
      if (pageData?.pageCode) {
        const res = await axios.get(
          config.GET_TABLE + "/" + id + "/" + pageData?.pageCode,
          {
            headers: {
              Authorization: "Bearer " + parsedData.token,
            },
          }
        );
        setDataTable(res.data.data);
      }
    })().catch(console.err);
  };

  useEffect(() => {
    getTableInfo(id, pageData);
  }, [data]);

  useEffect(() => {
    getTableInfo(id, pageData);
  }, []);

  useEffect(() => {
    if (!updateFieldVisible) {
      getTableInfoAfterUpdate(id, pageData);
    }
  }, [updateFieldVisible]);

  const addRecord = () => {
    let finalObj = {
      spaceId: dataTable[dataTable.length - 1]?.space_id,
      tableId: tableId,
      parentId: parentId,
      id: userData.user[0]._id,
      afterRow: dataTable[dataTable.length - 1]?.id,
      pageId: data.pageCode,
    };

    (async () => {
      setIsNewAdding(true);
      await axios.post(config.CREATEROW, finalObj, {
        headers: {
          Authorization: "Bearer " + parsedData.token,
        },
      });
      getTableInfo(id, pageData, "add");
    })()
      .catch(console.err)
      .finally(() => setIsNewAdding(false));
  };

  const editRecord = (data) => {
    setColumns(Object.keys(dataTable[0]));
    setSelectedData(data);
    // setAuth({token: "", passData: data});

    setUpdateFieldVisible(!updateFieldVisible);
  };

  const deleteRecord = (data) => {
    alertify.confirm(
      "Are you sure?",
      function () {
        let finalObj = {
          spaceId: userData.user[0].workspaceId,
          rowId: data.id,
          id: userData.user[0]._id,
        };
        (async () => {
          setIsNewAdding(true);
          await axios.post(config.DELETEROW, finalObj, {
            headers: {
              Authorization: "Bearer " + parsedData.token,
            },
          });
          getTableInfo(id, pageData, "add");
          // toast("Deleted Successfully");
          // getTableInfoAfterUpdate(id, pageData);
        })()
          .catch(console.err)
          .finally(() => setIsNewAdding(false));
        alertify.success("Successfully deleted");
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };

  const handleFormChange = async (value, cellType) => {
    console.log("cellType", cellType);
    const space_id = selectedData["space_id"];
    const rowId = selectedData["id"];
    const data = {
      spaceId: space_id,
      rowId: rowId,
      id: userData.user[0]._id,
      value: value,
      cellType: cellType,
    };

    await axios.post(config.UPDATECELL, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  // const updateCell = _.debounce(handleFormChange, 1000);

  const ThData = () => {
    const tempSchema = schema ? Object.keys(schema) : null;
    const temoColumns = schema
      ? tempSchema.map((key) => {
        return schema[key];
      })
      : [];

    return (
      <>
        {temoColumns?.map((data, index) => {
          return data.type === "file" ? null : (
            <CTableHeaderCell scope="col" key={data.name}>
              {data.name}
            </CTableHeaderCell>
          );
        })}
        <CTableHeaderCell></CTableHeaderCell>
      </>
    );
  };

  function validJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  const tdData = () => {
    const column = Object.keys(dataTable[0]);
    return dataTable.map((data) => {
      return (
        <CTableRow>
          {column.map((v, index) => {
            //? data[v].split("--") : [""];

            if (column[index] === "id") {
              return (
                <CTableHeaderCell scope="row" className="hidden" key={data._id}>
                  {data[v]}
                </CTableHeaderCell>
              );
            } else if (column[index] === "space_id") {
              return (
                <CTableDataCell className="hidden">{data[v]}</CTableDataCell>
              );
            } else {
              const otherData = data[v] ? data[v].value : "";
              const valid = validJson(otherData);
              const pdata = valid ? JSON.parse(otherData) : otherData;
              const finalData = Array.isArray(pdata) ? pdata.join(", ") : pdata;
              return (
                <CTableDataCell>{finalData ? finalData : "-"}</CTableDataCell>
              );
            }
          })}

          <CTableDataCell className="">
            <div className="d-flex  adminTableIconbox ">
              <span>
                <CIcon icon={cilPenNib} onClick={() => editRecord(data)} />
              </span>
              <span>
                <CIcon
                  icon={cilTrash}
                  style={{ marginLeft: "16px" }}
                  onClick={() => deleteRecord(data)}
                />
              </span>
            </div>
          </CTableDataCell>
        </CTableRow>
      );
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col overflow-x-auto p-3 bg-white rounded">
        {dataTable && dataTable.length ? (
          <div className="flex flex-col">
            <div
              className="py-1 inline-block min-w-full dynamicTableBox"
              style={{ display: loading ? "none" : "block" }}
            >
              <div className="buttonBox p-3 ">
                <CButton color="primary" onClick={() => addRecord()}>
                  Add Row
                </CButton>
              </div>
              <CTable striped hover>
                <CTableHead color="transparent">
                  <CTableRow>{ThData()}</CTableRow>
                </CTableHead>
                <CTableBody>{tdData()}</CTableBody>
              </CTable>
              {isNewAdding ? (
                <div style={{ justifyContent: "center", alignItems: "center" }}>
                  <CSpinner
                    color="#3c4b64"
                    size="sm"
                    variant="grow"
                    style={{ margin: "3px" }}
                  />
                  <CSpinner
                    color="#3c4b64"
                    size="sm"
                    variant="grow"
                    style={{ margin: "3px" }}
                  />
                  <CSpinner
                    color="#3c4b64"
                    size="sm"
                    variant="grow"
                    style={{ margin: "3px" }}
                  />
                </div>
              ) : null}
            </div>
            {selectedData && (
              <AddDynamicFields
                lastRow={lastRow}
                columns={columns}
                selectedData={selectedData}
                updateFieldVisible={updateFieldVisible}
                updateCell={handleFormChange}
                schema={schema}
                setUpdateFieldVisible={setUpdateFieldVisible}
              />
            )}
          </div>
        ) : (
          !loading && (
            <p className="text-center">
              Ask to create schema for this page to admin
            </p>
          )
        )}
        {loading ? (
          <div
            className="d-flex  p-3 "
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <CSpinner
              color="#3c4b64"
              size="sm"
              variant="grow"
              style={{ margin: "3px" }}
            />
            <CSpinner
              color="#3c4b64"
              size="sm"
              variant="grow"
              style={{ margin: "3px" }}
            />
            <CSpinner
              color="#3c4b64"
              size="sm"
              variant="grow"
              style={{ margin: "3px" }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default DynamicTable;
