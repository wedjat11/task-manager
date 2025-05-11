import React from "react";
import CardContainer from "../ui/CardContainer";
import LoginDiv from "../ui/LoginDiv";
import LoginImg from "../ui/LoginImg";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const MainContent = () => {
  return (
    <section id="login">
      <CardContainer>
        <LoginDiv>
          <LoginHeader />
          <LoginForm />
        </LoginDiv>
        <LoginImg></LoginImg>
      </CardContainer>
    </section>
  );
};

export default MainContent;
