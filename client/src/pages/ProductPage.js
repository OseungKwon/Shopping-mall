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

  //
  useEffect(() => {
    // 제품 아이디를 키로 가지고 있는 localStorage가 존재하지 않으면,
    if (window.localStorage.getItem(productId) === null) {
      console.log(productId);
      // Axios를 통해 서버에서 제품 데이터를 받아온다.
      Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(
        (response) => {
          // 받아온 데이터를 useState(Product,setProduct)에 저장
          setProduct(response.data[0]);
        }
      );
      // 제품 아이디를 키로 가지고 있는 localStorage가 존재하면,
    } else {
      // localStorage에서 데이터를 받아와 seProduct해준다.
      const getData = JSON.parse(window.localStorage.getItem(productId));
      setProduct(getData);
    }
  }, [productId]);

  // useState는 비동기적으로 작동해 useEffect를 사용해야 한다.
  useEffect(() => {
    // 페이지에 접속했을 때, Product는 []과 같이 초기화된 상태이므로 예외 처리
    if (Product.length !== 0) {
      // 제품 아이디를 키로 가지고 있는 localStorage가 존재하지 않으면,
      if (window.localStorage.getItem(productId) === null) {
        // Product 데이터를 localStorage에 제품아이디를 키로 하여 저장시킨다.
        const data = JSON.stringify(Product);
        window.localStorage.setItem(productId, data);
        console.log("server"); // 서버에서 데이터 받아옴
      } else {
        console.log("local"); // 로컬에 저장된 데이터 사용
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
