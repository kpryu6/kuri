import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { TbChartCircles } from "react-icons/tb";
import { GrSearch } from "react-icons/gr";
import "../../scss/PodList.scss";
import PodDetail from "./PodDetail";


const PodsList = ({ files, setFiles }) => {


  const [podData, setPodData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [searchValue, setSearchValue] = useState("");
  const [filteredPods, setFilteredPods] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

 // 받은 JSON 데이터를 podData 상태로 설정
  useEffect(() => {
    const testPods = Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      name: `Kubernetes Pod Name${(i % 2) + 1}`,
      namespace: "default",
      container_image: "nginx",
    }));
    setPodData(testPods);
  }, []);

  //�ĵ� �˻�
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
          <td>{pod.container_image}</td>

          <td>{isSelected ? "-" : "+"}</td>
        </tr>
        {isSelected && (
          <tr>
            <td colSpan={6}>
              <PodDetail />
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="pod-list">
      <div className="pod-title">
        <i>
          <TbChartCircles size="30" />
        </i>
        Pods
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
            <th>CONTAINER IMAGE</th>
            <th>DETAIL</th>
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
