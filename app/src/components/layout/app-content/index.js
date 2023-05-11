import React from "react";
import { Layout } from "antd";
import Product from "components/product";

const AppContent = () => {
  return (
    <Layout className="content-wrapper">
      <Product />
    </Layout>
  );
};

export default AppContent;
