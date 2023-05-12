import React from "react";
import { Layout, Row, Col, Button } from "antd";
import styled from "styled-components";
import { useAuth } from "providers/AuthProvider";
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

const StyledButton= styled(Button)`
  border: 0;
  background-color: rgb(16, 26, 39);
  color: var(--white);
`;

const StyledColLeft = styled(Col)`
  text-align: left;
`;
const StyledColRight = styled(Col)`
  text-align: right;
`;

function HeaderContent(props) {
  const { userFullName, signOut } = useAuth();
  return (
    <>
      <StyledLayoutHeader role="header">
        <StyledRowHeader>
          <StyledColLeft span={12}>Product</StyledColLeft>
          <StyledColRight span={12}>{userFullName}
          <StyledButton itemProp="secondary" onClick={signOut}>
              Sign out
            </StyledButton>
          </StyledColRight>
        </StyledRowHeader>
      </StyledLayoutHeader>
    </>
  );
}

export default HeaderContent;
