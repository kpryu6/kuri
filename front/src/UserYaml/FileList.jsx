import axios from "axios";
import React from "react";
import FileItem from "./FileItem";
import Scrollbars from "react-custom-scrollbars";
import "./../scss/Scrollbar.scss";

const FileList = ({ files, removeFile }) => {
  const deleteFileHandler = (_name) => {
    axios
      .delete(`http://localhost:8080/upload?name=${_name}`)
      .then(() => removeFile(_name))
      .catch((err) => console.error(err));
  };

  return (
    <div className="list">
      <Scrollbars>
        {files &&
          files.map((f) => (
            <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
          ))}
      </Scrollbars>
    </div>
  );
};

export default FileList;
