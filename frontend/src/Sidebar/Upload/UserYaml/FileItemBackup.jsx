import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../scss/Item.scss";

const FileItem = ({ file, deleteFile }) => {
  return (
    <li className="item" key={file.name}>
      <FontAwesomeIcon icon={faFileUpload} />
      <p>{file.name}</p>
      <div className="actions">
        {file.isUploading && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="fa-spin"
            onClick={() => deleteFile(file.name)}
          />
        )}
        {!file.isUploading && (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteFile(file.name)}
          />
        )}
      </div>
    </li>
  );
};

export default FileItem;
