import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFileAlt,
  faFileUpload,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./../scss/Item.scss";

const FileItem = ({ file, deleteFile }) => {
  return (
    <>
      <li className="file-item" key={file.name}>
        <FontAwesomeIcon icon={faFileUpload} />
        <p>{file.name}</p>
        <div className="actions">
          <div className="loading"></div>
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
    </>
  );
};

export default FileItem;
