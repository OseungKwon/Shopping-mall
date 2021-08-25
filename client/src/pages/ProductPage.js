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

  useEffect(() => {
    if (window.localStorage.getItem(productId) === null) {
      console.log("axios");
      console.log(productId);
      Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(
        (response) => {
          setProduct(response.data[0]);
        }
      );
    } else {
      var k = JSON.parse(window.localStorage.getItem(productId));
      setProduct(k);
    }
  }, [productId]);

  useEffect(() => {
    if (Product.length !== 0) {
      if (window.localStorage.getItem(productId) === null) {
        const data = JSON.stringify(Product);
        //console.log("a", data);
        window.localStorage.setItem(productId, data);
        console.log("server");
      } else {
        var k = JSON.parse(window.localStorage.getItem("key"));
        console.log("local", k);
        console.log(productId, Product);
      }
    }
  }, [Product, productId]);

  //

  const addToCartHandler = () => {
    dispatch(addToCart(Product._id));
    props.history.push("/");
  };

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
