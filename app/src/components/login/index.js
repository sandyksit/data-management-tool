import React from "react";
import { Form, Row, Col, Input, Button } from "antd";
import styled from "styled-components";

import { LOGIN_LABELS } from "./constant";
import "./index.less";

const StyledCol = styled(Col)`
  background: #101a27;
  padding: 170px 100px;
`;

const StyledRow = styled(Row)`
  padding: 10px 0;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 50px;
  margin: 20px 0;
  border-color: transparent;
`;

const Login = ({ isLoading, loginHandler, isRegister, signUpHandler, handleOnRegister }) => {
  const [form] = Form.useForm();

  const onLoginClick = () => {
    const loginDetails = {
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
    };

    loginHandler(loginDetails);
  };

  const onRegisterClick = async() => {
    const registerDetails = {
      name: form.getFieldValue("name"),
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
    };
    signUpHandler(registerDetails)
  }

  const loginForm = () => {
    return (
      <Form
        id="loginForm"
        onFinish={onLoginClick}
        layout="vertical"
        form={form}
        className="login-form"
      >
        <StyledRow>
          <Col span={24}>
            <Form.Item
              label={LOGIN_LABELS.USERNAME}
              name="email"
              className="label-control"
              rules={[
                {
                  required: true,
                  message: LOGIN_LABELS.ERROR_MSG.USERNAME,
                },
                {
                  type: 'email',
                  max: 60,
                  min: 0,
                },
              ]}
            >
              <Input className="input-control" autoComplete="off" />
            </Form.Item>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col span={24}>
            <Form.Item
              label={LOGIN_LABELS.PASSWORD}
              name="password"
              className="label-control"
              rules={[
                {
                  required: true,
                  message: LOGIN_LABELS.ERROR_MSG.PASSWORD,
                },
              ]}
            >
              <Input
                type={"password"}
                className="input-control"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col span={24}>
            <StyledButton loading={isLoading} htmlType="submit">
              Login
            </StyledButton>
          </Col>
        </StyledRow>
      </Form>
    );
  };
  const registerForm = () => {
    return (
      <Form
        id="loginForm"
        onFinish={onRegisterClick}
        layout="vertical"
        form={form}
        className="login-form"
      >
        <StyledRow>
          <Col span={24}>
          <Form.Item
              label={LOGIN_LABELS.NAME}
              name="name"
              className="label-control"
              rules={[
                {
                  required: true,
                  message: LOGIN_LABELS.ERROR_MSG.NAME,
                },
              ]}
            >
              <Input className="input-control" autoComplete="off" />
            </Form.Item>
            <Form.Item
              label={LOGIN_LABELS.USERNAME}
              name="email"
              className="label-control"
              rules={[
                {
                  required: true,
                  message: LOGIN_LABELS.ERROR_MSG.USERNAME,
                },
                {
                  type: 'email',
                  max: 60,
                  min: 0,
                },
              ]}
            >
              <Input className="input-control" autoComplete="off" />
            </Form.Item>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col span={24}>
            <Form.Item
              label={LOGIN_LABELS.PASSWORD}
              name="password"
              className="label-control"
              rules={[
                {
                  required: true,
                  message: LOGIN_LABELS.ERROR_MSG.PASSWORD,
                },
              ]}
            >
              <Input
                type={"password"}
                className="input-control"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col span={24}>
            <StyledButton loading={isLoading} htmlType="submit">
              Sign up
            </StyledButton>
          </Col>
        </StyledRow>
      </Form>
    );
  };

  return (
    <>
      <div className="login-wrapper">
        <Row style={{ height: "100%" }}>
          <StyledCol span={6}></StyledCol>
          <StyledCol span={12}>
            <Row>
              <Col span={24}>{isRegister ? registerForm() : loginForm()}
              {!isRegister && <Button  type="link" onClick={() => handleOnRegister(true)}>or Register</Button>}
              {isRegister && <Button  type="link" onClick={() => handleOnRegister(false)}>or Login</Button>}
              </Col>
            </Row>
          </StyledCol>
          <StyledCol span={6}></StyledCol>
        </Row>
      </div>
    </>
  );
};

export default Login;
