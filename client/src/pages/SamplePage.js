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
  const data = {
    name: "jamong",
    condition: "great"
  };
  const dataKey = Object.keys(data);
  for (var i = 0; i < 2; i++) {
    window.localStorage.setItem(dataKey[i], data[dataKey[i]]);
  }
  for (var i = 0; i < 2; i++) {
    console.log(window.localStorage.getItem(dataKey[i]));
  }
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
