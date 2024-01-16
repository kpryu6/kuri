import React from "react";
import axios from "axios";
import FileItem from "./FileItem";
import Scrollbars from "react-custom-scrollbars";
import "../../../scss/Scrollbar.scss";

const FileList = ({ files, removeFile }) => {
  const deleteFileHandler = (_name) => {
    axios
      .delete(`/upload?name=${_name}`)
      .then(() => removeFile(_name))
      .catch((err) => console.error(err));
  };

  return (
    <div className="list">
      <Scrollbars>
        {files && files.map((file) => (
          <FileItem key={file.name} file={file} deleteFile={deleteFileHandler} />
        ))}
      </Scrollbars>
    </div>
  );
};

export default FileList;
