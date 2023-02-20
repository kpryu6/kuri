import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import "../../scss/PodList.scss";

const PodsList = () => {
  const [podData, setPodData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchValue, setSearchValue] = useState("");
  const [filteredPods, setFilteredPods] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  // 파드 리스트
  useEffect(() => {
    const testPods = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Kubernetes Pod Name${(i % 2) + 1}`,
      namespace: "NAMESPACE1",
      restarts: "SORRY",
      podIp: i % 2 === 0 ? "111.111.111.111" : "111.111.111.333",
    }));
    setPodData(testPods);
  }, []);

  //파드 검색
  useEffect(() => {
    const filtered = podData.filter((pod) =>
      pod.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPods(filtered);
    setCurrentPage(1);
  }, [searchValue, podData]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPods.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (id) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  const renderRow = (pod) => {
    const isSelected = selectedId === pod.id;
    return (
      <React.Fragment key={pod.id}>
        <tr
          className={isSelected ? "selected" : ""}
          onClick={() => handleClick(pod.id)}
        >
          <td>{pod.id}</td>
          <td>{pod.name}</td>
          <td>{pod.namespace}</td>
          <td>{pod.restarts}</td>
          <td>{pod.podIp}</td>
          <td>{isSelected ? "-" : "+"}</td>
        </tr>
        {isSelected && (
          <tr>
            <td colSpan={6} className="detail">
              Pod Details
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="pod-list">
      <div className="pod-title">Pods</div>

      <div className="up-table">
        <div className="search-box">
          <input
            type="text"
            placeholder="Type in to Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="per-page-select">
          <label className="per-page">Show</label>
          <select
            id="per-page"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <table className="table">
        <thead className="table-head">
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>NAMESPACE</th>
            <th>RESTARTS</th>
            <th>POD IP</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{currentItems.map(renderRow)}</tbody>
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
