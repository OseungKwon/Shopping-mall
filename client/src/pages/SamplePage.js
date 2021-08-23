import React, { useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../components/AuthForm";

const SideBar = styled.div`
  border: 1px solid black;
  .hi {
    color: blue;
  }
  .no {
    color: red;
  }
`;
const Menu = styled.div`
  cursor: pointer;
`;

const SamplePage = () => {
  const [Show, setShow] = useState(true);
  if (Show === false) {
  }
  return (
    <Wrapper>
      <Menu onClick={() => setShow(!Show)}>Click</Menu>
      <SideBar>
        <nav className={Show ? "hi" : "no"}>hidden</nav>
      </SideBar>
    </Wrapper>
  );
};

export default SamplePage;
