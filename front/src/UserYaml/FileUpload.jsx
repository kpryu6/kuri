import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../scss/Upload.scss";
import axios from "axios";
import jsyaml from "js-yaml";
import { useState, useEffect } from "react";

const FileUpload = ({ files, setFiles, removeFile }) => {
  console.log(files);
  /*
  useEffect(() => {
    console.log(jsonText);
  }, [jsonText]);
*/

  const uploadHandler = (event) => {
    const file = event.target.files[0];

    file.isUploading = true;
    //Policy ????? ?????
    setFiles([...files, file]);
    //?? ??? ?? ??
  };
  /*
  const configReader = new FileReader();

  configReader.onload = (e) => {
    const yamlContent = e.target.result;
    console.log(yamlContent); //file ³»¿ë String

    const jsonContent = jsyaml.load(yamlContent);
    console.log(jsonContent); //json object

    const jsonFile = JSON.stringify(jsonContent);
    console.log(jsonFile); //String

    setJsonText(jsonFile);
  };

  configReader.readAsText(file);
  */

  return (
    <>
      <div className="card">
        <div className="inputs">
          <input type="file" onChange={uploadHandler} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            User's
          </button>
        </div>

        <p className="main">User's files</p>
        <p className="info">YAML files ONLY</p>
      </div>
    </>
  );
};

export default FileUpload;
