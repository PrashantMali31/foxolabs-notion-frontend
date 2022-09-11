import React, {useState, useEffect} from "react"
import {CFormInput, CSpinner} from "@coreui/react";
import {MultiSelect} from "react-multi-select-component";
import Select from "react-select/creatable";

const options1 = [
  {label: "Grapes 🍇", value: "grapes"},
  {label: "Mango 🥭", value: "mango"},
  {label: "Strawberry 🍓", value: "strawberry", disabled: true},
];
function DynamicInputField({
  columns,
  otherData,
  index,
  dataValue,
  handleFormChange,
  schema
}) {

  const [value, setValue] = React.useState()
  const [isArray, setIsArray] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [selected, setSelected] = React.useState([])
  const [updatedSchema, setUpdatedSchema] = React.useState([])
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [type, setType] = React.useState("")
  const [key, setKey] = React.useState("")

  useEffect(() => {
    const valid = validJson(otherData)
    const data = valid ? JSON.parse(otherData) : otherData;
    const schemaItem = []
    Object.keys(schema).map((key) => {
      schemaItem.push({...schema[key], key})
    })

    setUpdatedSchema(schemaItem)
    if (data) {
      setValue(data.value)
      setType(data.type)
      setKey(data.key)

      if (data.type === "multi_select") {
        const doptions = schema[data.key]
        const tempSeleced = []
        data?.value.map(item => {
          if (!item.includes("field"))
            tempSeleced.push({label: item, value: item})

          return value
        })
        setSelected(tempSeleced)
        const tempOptions = []
        doptions?.options?.map((item) => {
          tempOptions.push({label: item.value, value: item.value})
          return item
        })

        setOptions(tempOptions)
      }

      setIsArray(Array.isArray(data) ? true : false)
    }
  }, [])

  function validJson(str) {
    try {
      const json = JSON.parse(str);
      return true
    } catch (e) {
      return false;
    }
  }

  const onChange = async (event) => {

    let multiValue = ""
    console.log("event", event)
    if (type === "multi_select") {
      const tempValues = event.map(x => x.value)
      setSelected(event)
      multiValue = tempValues?.join(", ")
      if (event?.length === 0) {
        return false
      }

    }

    setValue(type !== "multi_select" ? event.target.value : "")
    setIsUpdating(true)

    const tempKey = key ? key : updatedSchema?.find(x => x.name === columns[index])?.key;
    await handleFormChange(multiValue ? multiValue : event.target.value, tempKey)
    setIsUpdating(false)

  }
  return (
    <div key={index} style={{display: "flex", marginBottom: 10, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
      <div style={{width: "80%"}}>
        {type === "multi_select" ? (
          <>
            <label className="form-label">{columns[index]}</label>
            <Select
              value={selected}
              onChange={onChange}
              options={options}
              isMulti
              isSearchable
            />
            {/* <MultiSelect
              options={options}
              value={selected}
              onChange={onChange}
              labelledBy="Select"
            /> */}
          </>
        ) : (
          <CFormInput
            name={columns[index]}
            label={columns[index]}
            placeholder={columns[index]}
            onChange={onChange}
            defaultValue={value}
            value={value}
          />
        )}
      </div>
      <div style={{marginTop: 30, marginLeft: 20}}>
        {
          isUpdating && (<div>
            <CSpinner color="success" variant="grow" />
          </div>)
        }
      </div>

      <hr />
    </div>
  )
}

export default DynamicInputField