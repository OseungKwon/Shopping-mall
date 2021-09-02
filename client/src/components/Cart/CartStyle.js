import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 6rem auto;
  width: 70%;
  Button {
    width: 20%;
  }
`;
export const Table = styled.table`
  color: black;
  & > thead {
    background-color: #e7f3ff;
  }
  & > tbody > {
    font-weight: lighter;
    &:nth-child(2n) {
      background-color: #f7f7f7;
    }
  }
  button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    color: #ff4040;
    width: 100%;
  }
`;

export const TotalPrice = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;
