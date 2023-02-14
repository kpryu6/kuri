import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../scss/Upload.scss";

const PolicyUpload = ({ files, setFiles }) => {
  console.log(files);
  const uploadHandler = (event) => {
    const file = event.target.files[0];

    file.isUploading = true;
    //Policy ????? ?????
    setFiles([...files, file]);
    //?? ??? ?? ??
  };

  return (
    <>
      <div className="card">
        <div className="inputs">
          <input type="file" onChange={uploadHandler} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Policy
          </button>
        </div>

        <p className="main">Network Policy files</p>
        <p className="info">YAML files ONLY</p>
      </div>
    </>
  );
};

export default PolicyUpload;
