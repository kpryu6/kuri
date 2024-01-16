import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ setFiles }) => {
  const FileUploadHandler = (event) => {
    const file = event.target.files[0];
    setFiles([file]);
  };

  return (
    <div>
      <input type="file" onChange={FileUploadHandler} />
    </div>
  );
};

const UserPostButton = ({ files }) => {
  const submitHandler = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    axios
      .post("http://localhost:8080/submit", formData)
      .then((response) => {
        console.log(response.data);
        // 업로드 성공 후 처리 로직 작성
      })
      .catch((error) => {
        console.error(error);
        // 업로드 실패 후 처리 로직 작성
      });
  };

  return (
    <div>
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

function UploadComponent() {
  const [files, setFiles] = useState([]);

  return (
    <div>
      <h1>Upload YAML File</h1>
      <FileUpload setFiles={setFiles} />
      <UserPostButton files={files} />
    </div>
  );
}

export default UploadComponent;