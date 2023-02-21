import axios from "axios";
import React from "react";
import PolicyItem from "./PolicyItem";
import Scrollbars from "react-custom-scrollbars";
import "../../../scss/Scrollbar.scss";

const PolicyList = ({ files, removeFile }) => {
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
            <PolicyItem key={f.name} file={f} deleteFile={deleteFileHandler} />
          ))}
      </Scrollbars>
    </div>
  );
};

export default PolicyList;
