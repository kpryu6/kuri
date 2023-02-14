import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./scss/PostButton.scss";
import axios from "axios";
import yaml from "js-yaml";
import { useState, useEffect } from "react";

const PostButton = ({ removeFile, allFiles, setAllFiles }) => {
  console.log(allFiles);

  const submitHandler = () => {
    const formData = new FormData();
    allFiles.forEach((file) => {
      formData.append(file.name, file, file.name);
    });

    //해결
    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
    }

    axios
      .post("http://localhost:8080/upload", formData)
      .then((res) => {
        setAllFiles(
          allFiles.map((file) => {
            file.isUploading = false;
            return file;
          })
        );
      })
      .catch((err) => {
        // inform the user
        console.error(err);
        setAllFiles(
          allFiles.filter((file) => {
            if (file.isUploading) {
              removeFile(file.name);
            }
            return !file.isUploading;
          })
        );
      });
  };

  /*
  const submitHandler = () => {
    const parseFile = () => {
      allFiles.forEach((file) => {
        const jsonParseFile = JSON.parse(file);
        return JSON.stringify(jsonParseFile);
        console.log(jsonParseFile);
        console.log(JSON.stringify(jsonParseFile));
      });
    };

    const uploadJsonFile = async (files) => {
      const mappingJsonParseFile = files.map(parseFile);
      const response = await axios.post("http://localhost:8080/upload", {
        mappingJsonParseFile,
      });
      return response.data;
    };
  };
*/
  return (
    <>
      <div className="submit">
        <button onClick={submitHandler}>
          <i>
            <FontAwesomeIcon icon={faCheckCircle} />
          </i>
          Sumbit
        </button>
      </div>
    </>
  );
};

export default PostButton;
