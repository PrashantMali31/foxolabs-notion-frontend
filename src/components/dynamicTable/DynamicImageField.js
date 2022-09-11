import React, {useState, useEffect} from "react"
import {CSpinner} from "@coreui/react"

function DynamicImageField({
  columns,
  otherData,
  finalData,
  index,
  fileRef,
  handleFileUploadUpload,
  handleFileUpload,
}) {

  const [inputvalue, setInputvalue] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onChange = async (event) => {
    setIsUploading(true)
    await handleFileUploadUpload(event, otherData[1])
    var url = URL.createObjectURL(event.target.files[0])
    setInputvalue(url)
    setIsUploading(false)

  }
  return (
    <div key={index} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>

      <div style={{width: "85%"}}>
        <p>{columns[index]}</p>
        {
          isUploading ? (<div>
            <CSpinner color="success" variant="grow" />
          </div>) : (

            <img style={{height: 100, width: 100}} src={inputvalue || finalData.url} alt="img" />

          )
        }

        <div style={{marginTop: 20}}>
          <input
            ref={fileRef}
            onChange={onChange}
            type="file"
            style={{display: "none"}}
          />
          <button onClick={handleFileUpload}>Upload File</button>

        </div>

        <hr />
      </div>
    </div>
  )
}

export default DynamicImageField