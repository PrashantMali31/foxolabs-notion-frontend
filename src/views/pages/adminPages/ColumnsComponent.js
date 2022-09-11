import React, {useContext, useState} from "react";
import {CButton} from "@coreui/react";
import {
  CTable, CTableBody, CTableHead,
  CTableHeaderCell,
  CTableRow, CTableDataCell,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from "@coreui/react";


export const Columns = (props) => {
  const {onAddPage, visible, setVisible, columns} = props

  console.log("columns", columns)
  return (

    <CModal fullscreen  visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Table Schema</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable striped hover>
          <CTableHead>{
            columns?.[0] && Object.keys(columns?.[0]).map((key) => {
              if (key === "_id" || key === "created_at" || key === "updated_at" || key === "__v") return null
              return (
                <CTableHeaderCell >{key}</CTableHeaderCell>

              )
            })
          }
          </CTableHead>
          <CTableBody>
            {
              columns?.map((item, index) => {
                return (
                  <CTableRow>
                    {
                      columns?.[0] && Object.keys(columns?.[0]).map((key) => {
                        if (key === "_id" || key === "created_at" || key === "updated_at" || key === "__v") return null
                        return (

                          <CTableDataCell>{item[key]}</CTableDataCell>


                        )
                      })
                    }
                  </CTableRow>


                )
              })
            }
          </CTableBody>

        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Columns;
