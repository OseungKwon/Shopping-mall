import Axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../components/AuthForm";
import { useDispatch } from "react-redux";
import { addToCart } from "../_actions/user_actions";

const Wrapper = styled.div`
  margin: 6rem auto;
  width: 70%;
  border: 1px solid black;
  & > Button {
    width: 20%;
    margin: 1rem;
  }
`;

const ItemTitle = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: black;
`;

const ItemInfo = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #adadad;
  margin-top: 2rem;
  font-size: 1rem;
`;
const ItemDescription = styled.div`
  margin: 1rem;
  margin-bottom: 0;
  padding: 1rem;
  border: 1px solid #adadad;
`;

const ProductPage = (props) => {
  const dispatch = useDispatch();

  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);

  if (window.localStorage.length > 0) {
    const dataKey = window.localStorage.getItem("key");

    for (var i = 0; i < dataKey.length; i++) {
      console.log("c", window.localStorage.getItem(dataKey[i]));
    }
  } else {
  }

  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(
      (response) => {
        setProduct(response.data[0]);
      }
    );
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(Product._id));
    props.history.push("/");
  };

  const dataKey = Object.keys(Product);
  window.localStorage.setItem("key", [...dataKey]);
  console.log(window.localStorage.getItem("key"));
  console.log(dataKey);
  for (var i = 0; i < dataKey.length; i++) {
    window.localStorage.setItem(dataKey[i], Product[dataKey[i]]);
  }
  for (var i = 0; i < dataKey.length; i++) {
    //console.log("c", window.localStorage.getItem(dataKey[i]));
  }

  return (
    <Wrapper>
      <ItemTitle>{Product.title}</ItemTitle>
      <ItemInfo>
        <div>가격: {Product.price}$</div>
        <div>판매 횟수: {Product.sold}</div>
        <div>조회수: {Product.views}</div>
      </ItemInfo>
      <ItemDescription>{Product.description}</ItemDescription>
      <Button onClick={addToCartHandler}>쇼핑카트에 담기</Button>
    </Wrapper>
  );
};

export default ProductPage;
