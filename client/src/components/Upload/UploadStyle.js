import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 6rem auto;
  display: flex;
  justify-content: center;
`;

export const TextArea = styled.textarea`
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
`;
export const Select = styled.select`
  margin-top: 0.3rem;
  border: 1px solid rgb(215, 226, 235);
  padding: 0.3rem;
  width: 80%;
  border-radius: 5px;
  //appearance: none;
  &:focus {
    border-color: #0078ff;
    outline-color: #0078ff;
  }
  &:hover {
    border-color: #0078ff;
  }
`;

export const Form = styled.form`
  display: flex;
  margin-top: 5rem;
`;

export const UploadImage = styled.div`
  position: relative;
  flex: 1;
  width: 500px;
  img {
    height: 400px;
    width: 100%;
    object-fit: cover;
    display: flex;
    justify-content: center;
  }
  label {
    position: absolute;
    left: 0;
    bottom: 31.5px;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.4rem;
    background: #909090;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
`;

export const UploadContent = styled.div`
  flex: 1;
  width: 250px;
  margin: 2rem;
`;

export const Input = styled.input`
  display: none;
`;