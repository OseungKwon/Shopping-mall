import Axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Wrapper, InputForm, Button } from "../components/AuthForm";
const TextArea = styled.textarea`
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
const Select = styled.select`
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

const Continents = [
  { key: 1, value: "black" },
  { key: 2, value: "brown" },
  { key: 3, value: "gray" },
  { key: 4, value: "white" }
];

const UploadPage = (props) => {
  const [form, setForm] = useState({
    Title: "",
    Description: "",
    Price: 0,
    SelectContinent: 1
  });

  const { Title, Description, Price, SelectContinent } = form;

  const onChange = (e) => {
    if (e.target.id === "SelectContinent") {
      const nextForm = {
        ...form,
        [e.target.id]: Number(e.target.value)
      };
      setForm(nextForm);
    } else {
      const nextForm = {
        ...form,
        [e.target.id]: e.target.value
      };
      setForm(nextForm);
    }
    console.log(form);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: Title,
      description: Description,
      price: Price,
      continents: SelectContinent
    };
    Axios.post("/api/product/uploadProduct", data).then((res) => {
      if (res.data.success) {
        alert("Product Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };
  //

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <InputForm>
          <span>Title</span>
          <input type="text" id="Title" onChange={onChange} />
        </InputForm>
        <InputForm>
          <span>Description</span>
          <TextArea id="Description" onChange={onChange} />
        </InputForm>
        <InputForm>
          <span>Price($)</span>
          <input type="text" id="Price" onChange={onChange} />
        </InputForm>
        <InputForm>
          <span>Color</span>
          <Select onChange={onChange} id="SelectContinent">
            {Continents.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </Select>
        </InputForm>
        <Button>Upload</Button>
      </form>
    </Wrapper>
  );
};

export default UploadPage;
