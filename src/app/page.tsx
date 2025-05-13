"use client";
import React, { FC } from "react";
import styled from "styled-components";
import { useFormik } from "formik";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  background-image: url("/test.png");
  background-size: cover;
  background-position: center;
`;

const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  padding: 40px 60px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 90%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-weight: 700;
  color: #111;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 40px;
  }
`;
const Button = styled.button`
  background-color: #52d85d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45c14d;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 10px;
    margin-top: 10px;
  }
`;

const Input = styled.input`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  @media (max-width: 768px) {
    font-size: 0.8rem;
    width: 70%;
    margin-bottom: 10px;
    padding: 10px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 60px;
  padding-bottom: 10px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Mya = styled.a`
  color: #777;
  margin-top: 20px;
  text-decoration: underline;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 30px;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const Login: FC = () => {
  const formik = useFormik<{ email: string; password: string }>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: { email?: string; password?: string } = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome back</Title>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          )}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          )}
          <Label
            style={{
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input type="checkbox" style={{ marginRight: "10px" }} /> Keep me
            signed in
          </Label>
          <Button type="submit">Sign In</Button>
        </form>
        <Mya href="#">Forgot password?</Mya>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
