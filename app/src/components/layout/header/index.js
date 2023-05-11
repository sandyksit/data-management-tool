import React from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
const StyledLayoutHeader = styled(Layout.Header)`
  background-color: var(--blackPearl);
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
  color: var(--white);
  >div {
    color: var(--white);
  }
`;
const StyledRowHeader = styled(Row)`
  flex-wrap: nowrap;
`;

const StyledColLeft = styled(Col)`
  text-align: left;
`;

function HeaderContent() {
  return (
    <>
      <StyledLayoutHeader role="header">
        <StyledRowHeader>
          <StyledColLeft span={12}>Products</StyledColLeft>
        </StyledRowHeader>
      </StyledLayoutHeader>
    </>
  );
}

export default HeaderContent;
