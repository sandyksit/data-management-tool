import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import HeaderContent from "../header";
import Routers from "routes/index";
import "./index.less";

const StyledContent = styled(Layout.Content)`
  margin-top: 6rem;
`;

function App() {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <HeaderContent />
        <StyledContent>
          <Routers />
        </StyledContent>
      </Layout>
    </>
  );
}

export default App;
