import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 6rem auto;
  width: 70%;
  border: 1px solid black;
  & > Button {
    width: 20%;
    margin: 1rem;
  }
`;

export const ItemTitle = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: black;
`;

export const ItemInfo = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #adadad;
  margin-top: 2rem;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
`;
export const ItemDescription = styled.p`
  border: 1px solid #adadad;
  padding: 1rem;
  height: 67.5%;
  white-space: pre-line;
`;

export const LeftSide = styled.div`
  flex: 1;
`;
export const RightSide = styled.div`
  flex: 1;
  margin-left: 1rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  > * {
    margin-bottom: 1rem;
  }
`;