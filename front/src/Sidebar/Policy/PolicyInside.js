import React from "react";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import PolicyDetail from "./PolicyDetail";

const PolicyInside = ({ flag1 }) => {
  const [flag, setFlag] = useState(true);

  const [policies] = useState([
    {
      apiVersion: "networking.k8s.io/v1",
      kind: "NetworkPolicy",
      metadata: {
        name: "test-network-policy",
        namespace: "default",
      },
      spec: {
        podSelector: {
          matchLabels: {
            role: "db",
          },
        },
        policyTypes: ["Ingress", "Egress"],
        ingress: [
          {
            from: [
              {
                ipBlock: {
                  cidr: "172.17.0.0/16",
                  except: ["172.17.1.0/24"],
                },
              },
              {
                namespaceSelector: {
                  matchLabels: {
                    project: "myproject",
                  },
                },
              },
              {
                podSelector: {
                  matchLabels: {
                    role: "frontend",
                  },
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 6379,
              },
            ],
          },
        ],
        egress: [
          {
            to: [
              {
                ipBlock: {
                  cidr: "10.0.0.0/24",
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 5978,
              },
            ],
          },
        ],
      },
    },
    {
      apiVersion: "networking.k8s.io/v1",
      kind: "NetworkPolicy",
      metadata: {
        name: "orders-db-access",
        namespace: "sock-shop",
      },
      spec: {
        podSelector: {
          matchLabels: {
            name: "orders-db",
          },
        },
        ingress: [
          {
            from: [
              {
                podSelector: {
                  matchLabels: {
                    name: "orders",
                  },
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 27017,
              },
            ],
          },
        ],
      },
    },
    {
      apiVersion: "networking.k8s.io/v1",
      kind: "NetworkPolicy",
      metadata: {
        name: "test-network-policy",
        namespace: "default",
      },
      spec: {
        podSelector: {
          matchLabels: {
            role: "db",
          },
        },
        policyTypes: ["Ingress", "Egress"],
        ingress: [
          {
            from: [
              {
                ipBlock: {
                  cidr: "172.17.0.0/16",
                  except: ["172.17.1.0/24"],
                },
              },
              {
                namespaceSelector: {
                  matchLabels: {
                    project: "myproject",
                  },
                },
              },
              {
                podSelector: {
                  matchLabels: {
                    role: "frontend",
                  },
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 6379,
              },
            ],
          },
        ],
        egress: [
          {
            to: [
              {
                ipBlock: {
                  cidr: "10.0.0.0/24",
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 5978,
              },
            ],
          },
        ],
      },
    },
    {
      apiVersion: "networking.k8s.io/v1",
      kind: "NetworkPolicy",
      metadata: {
        name: "orders-db-access",
        namespace: "sock-shop",
      },
      spec: {
        podSelector: {
          matchLabels: {
            name: "orders-db",
          },
        },
        ingress: [
          {
            from: [
              {
                podSelector: {
                  matchLabels: {
                    name: "orders",
                  },
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 27017,
              },
            ],
          },
        ],
      },
    },
    {
      apiVersion: "networking.k8s.io/v1",
      kind: "NetworkPolicy",
      metadata: {
        name: "test-network-policy",
        namespace: "default",
      },
      spec: {
        podSelector: {
          matchLabels: {
            role: "db",
          },
        },
        policyTypes: ["Ingress", "Egress"],
        ingress: [
          {
            from: [
              {
                ipBlock: {
                  cidr: "172.17.0.0/16",
                  except: ["172.17.1.0/24"],
                },
              },
              {
                namespaceSelector: {
                  matchLabels: {
                    project: "myproject",
                  },
                },
              },
              {
                podSelector: {
                  matchLabels: {
                    role: "frontend",
                  },
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 6379,
              },
            ],
          },
        ],
        egress: [
          {
            to: [
              {
                ipBlock: {
                  cidr: "10.0.0.0/24",
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 5978,
              },
            ],
          },
        ],
      },
    },
    {
      apiVersion: "networking.k8s.io/v1",
      kind: "NetworkPolicy",
      metadata: {
        name: "orders-db-access",
        namespace: "sock-shop",
      },
      spec: {
        podSelector: {
          matchLabels: {
            name: "orders-db",
          },
        },
        ingress: [
          {
            from: [
              {
                podSelector: {
                  matchLabels: {
                    name: "orders",
                  },
                },
              },
            ],
            ports: [
              {
                protocol: "TCP",
                port: 27017,
              },
            ],
          },
        ],
      },
    },
  ]);

  const [detailData, setDetailData] = useState([{}]);

  const handleClickEach = (item) => {
    console.log("hello");

    setDetailData(item);
    setFlag(false);
  };

  useEffect(() => {
    setData(policies);
    if (flag1 === true) {
      setFlag(false);
    }
  }, [policies]);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [items] = useState(4);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div>
      {flag ? (
        <div>
          <div>
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
                Policies List
              </div>
              <table
                style={{
                  minWidth: "100%",
                  tableLayout: "auto",
                  color: "#18415c",
                }}
              >
                <thead
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <tr
                    style={{
                      backgroundColor: "#18415c",
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
                      MATCH LABELS
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
                      INGRESS
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
                      EGRESS
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
                      REMOVE
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
                              color: "black",
                            }}
                            onClick={() => handleClickEach(item)}
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
                              {item.metadata.name}
                            </td>
                            <td
                              style={{
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                paddingTop: "0.75rem" /* 12px */,
                                paddingBottom: "0.75rem",
                              }}
                            >
                              {item.metadata.namespace}
                            </td>
                            <td
                              style={{
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                paddingTop: "0.75rem" /* 12px */,
                                paddingBottom: "0.75rem",
                              }}
                            >
                              {JSON.stringify(
                                item.spec.podSelector.matchLabels
                              )}
                            </td>
                            <td
                              style={{
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                paddingTop: "0.75rem" /* 12px */,
                                paddingBottom: "0.75rem",
                              }}
                            >
                              {item.spec.ingress ? (
                                <div>exist</div>
                              ) : (
                                <div>null</div>
                              )}
                            </td>
                            <td
                              style={{
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                                paddingTop: "0.75rem" /* 12px */,
                                paddingBottom: "0.75rem",
                              }}
                            >
                              {item.spec.egress ? (
                                <div>exist</div>
                              ) : (
                                <div>null</div>
                              )}
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
          </div>
        </div>
      ) : (
        <div>
          <PolicyDetail item={detailData}></PolicyDetail>
        </div>
      )}
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
    color: #18415c;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #18415c;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: black;
  }
`;
export default PolicyInside;
