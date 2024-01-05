import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { MdOutlinePolicy } from "react-icons/md";
import "../../scss/PolicyPageList.scss";
import { GrSearch } from "react-icons/gr";
import PolicyPageDetail from "./PolicyPageDetail";

const PolicyPageList = () => {
  const [policyData, setpolicyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchValue, setSearchValue] = useState("");
  const [filteredPolicies, setFilteredPolicies] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  // 파드 리스트
  useEffect(() => {
    const testPolicies = Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      name: `Policy Name${(i % 2) + 1}`,
      namespace: "default",
      container_image: "nginx",
      ingress: "ingress",
      egress: "egress",
    }));
    setpolicyData(testPolicies);
  }, []);

  //파드 검색
  useEffect(() => {
    const filtered = policyData.filter((policy) =>
      policy.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPolicies(filtered);
    setCurrentPage(1);
  }, [searchValue, policyData]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPolicies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleClick = (id) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  const renderRow = (policy) => {
    const isSelected = selectedId === policy.id;
    return (
      <React.Fragment key={policy.id}>
        <tr
          className={isSelected ? "selected" : ""}
          onClick={() => handleClick(policy.id)}
        >
          <td>{policy.id}</td>
          <td>{policy.name}</td>
          <td>{policy.namespace}</td>
          <td>{policy.container_image}</td>
          <td>{policy.ingress}</td>
          <td>{policy.egress}</td>
          <td>{isSelected ? "-" : "+"}</td>
        </tr>
        {isSelected && (
          <tr>
            <td colSpan={7}>
              <PolicyPageDetail />
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="policy-list">
      <div className="policy-title">
        <i>
          <MdOutlinePolicy size="30" />
        </i>
        Policies
      </div>

      <div className="up-table">
        <div className="search-box">
          <GrSearch size="30" />
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
            <th>CONTAINER IMAGE</th>
            <th>INGRESS</th>
            <th>EGRESS</th>
            <th>DETAIL</th>
          </tr>
        </thead>
        <tbody>{currentItems.map(renderRow)}</tbody>
      </table>

      <div className="Policy-PaginationBox">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={policyData.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
};

export default PolicyPageList;
