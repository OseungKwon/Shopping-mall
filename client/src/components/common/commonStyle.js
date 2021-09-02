import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 6rem auto;
  width: 250px;
  & > h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    overflow: visible;
  }
`;

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
  & > span {
    font-size: 0.8rem;
  }
  & > input {
    margin-top: 0.3rem;
    padding: 5px;
    border-radius: 5px;
    background: rgb(251, 251, 253);
    border: 1px solid rgb(215, 226, 235);
    outline-color: #0078ff;
    font-size: 1rem;
    &::placeholder {
      color: gray;
      font-weight: 100;
      font-size: 0.8rem;
    }
  }
`;
export const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 0.4rem;
  background: #0078ff;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;