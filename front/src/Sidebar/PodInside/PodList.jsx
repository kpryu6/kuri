import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
import Pagination from "react-js-pagination"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom"; // eslint-disable-line no-unused-vars
import styled from "styled-components"; // eslint-disable-line no-unused-vars

const PodsList = () => {
  useEffect(() => {});
  const testPods = [
    {
      "#": "1",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "2",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
    {
      "#": "3",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "4",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
    {
      "#": "5",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "6",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
    {
      "#": "7",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "8",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
    {
      "#": "9",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "10",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
    {
      "#": "11",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "12",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
    {
      "#": "13",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "14",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
    {
      "#": "15",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "16",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
    {
      "#": "17",
      NAME: "Pod1",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "10",
      RAMUSAGE: "10",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.111",
    },
    {
      "#": "18",
      NAME: "Pod2",
      NAMESPACE: "NAMESPACE1",
      CPUUSAGE: "80",
      RAMUSAGE: "80",
      RESTARTS: "SORRY",
      PODIP: "111.111.111.333",
    },
  ];
  // const [posts, setPosts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postPerPage] = useState(10); // 페이지당 포스트 개수
  // const indexOfLastPost = currentPage * postPerPage;
  // const indexOfFirstPost = indexOfLastPost - postPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost - indexOfLastPost); //0~10번

  // const paginate = (pageNum) => setCurrentPage(pageNum); // 클릭 이벤트 => 페이지 바꾸기

  useEffect(() => {
    setData(testPods);
  }, []);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [items] = useState(12);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1024px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          font: "bold",
          marginTop: "5px",
          marginBottom: "3px",
          fontSize: "1.25rem" /* 20px */,
          lineHeight: "1.75rem" /* 28px */,
        }}
      >
        Pods List
      </div>
      <table
        style={{
          minWidth: "100%",
          tableLayout: "auto",
          color: "grey",
        }}
      >
        <thead
          className="justify-between"
          style={{
            justifyContent: "space-between",
          }}
        >
          <tr
            className="bg-gray-800"
            style={{
              backgroundColor: "grey",
            }}
          >
            <th
              className="text-gray-300 px-4 py-3"
              style={{
                paddingLeft: "1rem" /* 16px */,
                paddingRight: "1rem",
                color: "white",
                fontSize: "1rem",
              }}
            >
              #
            </th>
            <th
              className="text-gray-300 px-4 py-3"
              style={{
                paddingLeft: "1rem" /* 16px */,
                paddingRight: "1rem",
                color: "white",
                fontSize: "1rem",
              }}
            >
              NAME
            </th>
            <th
              className="text-gray-300 px-4 py-3"
              style={{
                paddingLeft: "1rem" /* 16px */,
                paddingRight: "1rem",
                color: "white",
                fontSize: "1rem",
              }}
            >
              NAMESPACE
            </th>
            <th
              className="text-gray-300 px-4 py-3"
              style={{
                paddingLeft: "1rem" /* 16px */,
                paddingRight: "1rem",
                color: "white",
                fontSize: "1rem",
              }}
            >
              CPU USAGE (MIL)
            </th>
            <th
              className="text-gray-300 px-4 py-3"
              style={{
                paddingLeft: "1rem" /* 16px */,
                paddingRight: "1rem",
                color: "white",
                fontSize: "1rem",
              }}
            >
              RAM USAGE (MB)
            </th>
            <th
              className="text-gray-300 px-4 py-3"
              style={{
                paddingLeft: "1rem" /* 16px */,
                paddingRight: "1rem",
                color: "white",
                fontSize: "1rem",
              }}
            >
              RESTARTS
            </th>
            <th
              className="text-gray-300 px-4 py-3"
              style={{
                paddingLeft: "1rem" /* 16px */,
                paddingRight: "1rem",
                color: "white",
                fontSize: "1rem",
              }}
            >
              POD IP
            </th>
          </tr>

          {data
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((item) => {
              return (
                <>
                  <tr
                    style={{
                      backgroundColor: "white",
                      borderWidth: "2px",
                      borderColor: "gray",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    <td
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.75rem" /* 12px */,
                        paddingBottom: "0.75rem",
                      }}
                    >
                      {item["#"]}
                    </td>
                    <td
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.75rem" /* 12px */,
                        paddingBottom: "0.75rem",
                      }}
                    >
                      {item.NAME}
                    </td>
                    <td
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.75rem" /* 12px */,
                        paddingBottom: "0.75rem",
                      }}
                    >
                      {item.NAMESPACE}
                    </td>
                    <td
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.75rem" /* 12px */,
                        paddingBottom: "0.75rem",
                      }}
                    >
                      {item.CPUUSAGE}
                    </td>
                    <td
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.75rem" /* 12px */,
                        paddingBottom: "0.75rem",
                      }}
                    >
                      {item.RAMUSAGE}
                    </td>
                    <td
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.75rem" /* 12px */,
                        paddingBottom: "0.75rem",
                      }}
                    >
                      {item.RESTARTS}
                    </td>
                    <td
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        paddingTop: "0.75rem" /* 12px */,
                        paddingBottom: "0.75rem",
                      }}
                    >
                      {item.PODIP}
                    </td>
                  </tr>
                </>
              );
            })}
        </thead>
      </table>
      <div>
        <PaginationBox>
          <Pagination
            activePage={page}
            itemsCountPerPage={items}
            totalItemsCount={data.length - 1}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          ></Pagination>
        </PaginationBox>
      </div>
    </div>
  );
};

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

export default PodsList;
