import React, { useEffect, useState } from "react";
import { Row, Col, Button, Layout } from "antd";
import styled from "styled-components";
import { Table } from "antd";
import "./index.less";
import {
  getProducts,
  generateProducts,
  filteredProducts,
} from "services/product";
import CustomChart from "components/common/custom-chart";
import { useDispatch } from "react-redux";
import { actions } from "redux/reducers/alert";

const StyledCol = styled(Col)`
  padding: 20px;
`;

const Product = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isGenerator, setIsGenerator] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [isDuplicateORGenerateDone, setIsDuplicateORGenerateDone] =
    useState(false);
  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const getAllProducts = async () => {
    setLoading(true);
    const response = await getProducts({
      page: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    });
    if (response?.error) {
      setLoading(false);
      dispatch(actions.set({message:response?.error?.message}))
    } else {
      setLoading(false);
      setData(response?.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 5000000,
        },
      });
    }
  };

  useEffect(() => {
    getAllProducts(); // eslint-disable-next-line
  }, [JSON.stringify(tableParams), isDuplicateORGenerateDone]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  const handleGenerator = async () => {
    setIsGenerator(true);
    const response = await generateProducts();
    if (response?.error) {
      setIsGenerator(false);
      dispatch(actions.set({message:response?.error?.message}))
    } else {
      setIsGenerator(false);
      dispatch(actions.set({level: 'success', message:response?.message}))
    }
  };
  const handleFiltered = async () => {
    setIsCleaning(true);
    const response = await filteredProducts();
    if (response?.error) {
      setIsCleaning(false);
      dispatch(actions.set({message:response?.error?.message}))
    } else {
      setIsDuplicateORGenerateDone(true);
      setIsCleaning(false);
      dispatch(actions.set({level: 'success', message:response?.message}))
    }
  };

  return (
    <>
      <Layout>
        <div className="product-wrapper">
          <Row justify="center">
            <StyledCol>
              <Button loading={isGenerator} onClick={handleGenerator}>
                {isGenerator ? "Please wait..." : "Generate"}
              </Button>
            </StyledCol>
            <StyledCol>
              <Button loading={isCleaning} onClick={handleFiltered}>
                {isCleaning ? "Please wait..." : "Clean Duplicate Records"}
              </Button>
            </StyledCol>
          </Row>
          <Row style={{ height: "100%" }}>
            <StyledCol span={12}>
              <Table
                rowKey={(record) => record?.login?.uuid}
                columns={columns}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                size="small"
                dataSource={data}
              />
            </StyledCol>
            <StyledCol span={12}>
              {data.length > 0 && <CustomChart data={data}/>}
            </StyledCol>
          </Row>
        </div>
      </Layout>
    </>
  );
};

export default Product;
