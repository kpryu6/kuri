import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../scss/Upload.scss";

const FileUpload = ({ files, setFiles }) => {
  const FileUploadHandler = (event) => {
    const file = event.target.files[0];
    file.isUploading = true;
    setFiles([...files, file]);
  };

  return (
    <div className="card">
      <div className="pod-inputs">
        <input type="file" onChange={FileUploadHandler} />
        <button
          onClick={() => {
            document.querySelector('.pod-inputs input[type="file"]').click();
          }}
        >
          <i>
            <FontAwesomeIcon icon={faPlus} />
          </i>
          Pod
        </button>
      </div>

      <p className="main">Pod files</p>
      <p className="info">YAML files ONLY</p>
    </div>
  );
};

export default FileUpload;
