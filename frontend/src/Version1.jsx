import "./scss/UploadFiles.scss";
import React, { useState } from "react";

import FileUpload from "./UserYaml/FileUpload";
import FileList from "./UserYaml/FileList";

import PolicyUpload from "./NetworkPolicy/PolicyUpload";
import PolicyList from "./NetworkPolicy/PolicyList";

import TockenHost from "./Config/TockenHost";

import UserPostButton from "./UserYaml/UserPostButton";
import PolicyPostButton from "./NetworkPolicy/PolicyPostButton";
import BackToFront from "./Graph/BackToFront";

function Version1() {
  //����� ���� ���ε�
  const [ufiles, usetFiles] = useState([]);

  const uremoveFile = (filename) => {
    usetFiles(ufiles.filter((file) => file.name !== filename));
  };

  //��Ʈ��ũ ��å ���ε�
  const [pfiles, psetFiles] = useState([]);

  const premoveFile = (filename) => {
    psetFiles(pfiles.filter((file) => file.name !== filename));
  };

  return (
    <div>
      <h1 className="project">Kubernetes Network Policy</h1>
      <div className="center-top">
        <div>
          <p className="user"></p>
          <FileUpload
            files={ufiles}
            setFiles={usetFiles}
            removeFile={uremoveFile}
          />
          <FileList files={ufiles} removeFile={uremoveFile} />
          <div className="UserPostButton">
            <UserPostButton
              files={ufiles}
              setFiles={usetFiles}
              removeFile={uremoveFile}
            />
          </div>
        </div>

        <div>
          <p className="network_policy"></p>
          <PolicyUpload
            files={pfiles}
            setFiles={psetFiles}
            removeFile={premoveFile}
          />
          <PolicyList files={pfiles} removeFile={premoveFile} />
          <div className="PolicyPostButton">
            <PolicyPostButton
              files={pfiles}
              setFiles={psetFiles}
              removeFile={premoveFile}
            />
          </div>
        </div>

        <div>
          <p className="TockenHost"></p>
          <TockenHost />
        </div>
      </div>
    </div>
  );
}

export default Version1;
