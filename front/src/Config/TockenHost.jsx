import React, { useState } from "react";
import axios from "axios";

import "./../scss/TockenHost.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const TockenHost = () => {
  const [config, setConfig] = useState({
    token: "",
    host: "",
  });

  const handleInput = (event) => {
    setConfig({
      ...config,
      [event.target.name]: event.target.value,
    });
  };
  console.log(config);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/tockenhost", {
        token: config.token,
        host: config.host,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="token-host-form">
      <h1>Token</h1>
      <textarea
        type="text"
        name="token"
        value={config.token}
        onChange={handleInput}
        className="token-input"
      />
      <h2>Host</h2>
      <textarea
        type="text"
        name="host"
        value={config.host}
        onChange={handleInput}
        className="host-input"
      />
      <button
        type="submit"
        className="token-host-submit"
        onClick={handleSubmit}
      >
        <i>
          <FontAwesomeIcon icon={faCheckCircle} />
        </i>
        Submit
      </button>
    </form>
  );
};
export default TockenHost;
