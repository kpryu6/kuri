import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../scss/Upload.scss";

const PolicyUpload = ({ files, setFiles }) => {
  console.log(files);
  const policyUploadHandler = (event) => {
    const file = event.target.files[0];
    file.isUploading = true;
    setFiles([...files, file]);
  };

  return (
    <>
      <div className="card">
        <div className="policy-inputs">
          <input type="file" onChange={policyUploadHandler} />
          <button
            onClick={() => {
              document
                .querySelector('.policy-inputs input[type="file"]')
                .click();
            }}
          >
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
