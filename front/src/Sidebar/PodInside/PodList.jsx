import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../scss/PodList.scss";

const PodsList = () => {
  const [podData, setPodData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const testPods = Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      name: `Kubernetes Pod Name${(i % 2) + 1}`,
      namespace: "NAMESPACE1",
      restarts: "SORRY",
      podIp: i % 2 === 0 ? "111.111.111.111" : "111.111.111.333",
    }));
    setPodData(testPods);
  }, []);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = podData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pod-list">
      <div className="pod-title">Pods</div>

      <table className="table">
        <thead className="table-head">
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>NAMESPACE</th>
            <th>RESTARTS</th>
            <th>POD IP</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((pod) => (
            <tr key={pod.id}>
              <td>{pod.id}</td>
              <td>{pod.name}</td>
              <td>{pod.namespace}</td>
              <td>{pod.restarts}</td>
              <td>{pod.podIp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="PaginationBox">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={podData.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
};

export default PodsList;
