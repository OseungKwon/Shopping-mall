import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../_actions/user_actions";
import styled from "styled-components";
import { Button } from "../components/AuthForm";

const Wrapper = styled.div`
  margin: 6rem auto;
  width: 70%;
  Button {
    width: 20%;
  }
`;
const Table = styled.table`
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

const TotalPrice = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CartPage = (props) => {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            if (response.payload.length > 0) {
              calculateTotal(response.payload);
            }
          }
        );
      }
    }
  }, [props.user.userData, dispatch]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };
  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.cartDetail.length <= 0) {
        setShowTotal(false);
      } else {
        calculateTotal(response.payload.cartDetail);
      }
    });
  };

  return (
    <Wrapper>
      {props.user.cartDetail ? (
        <>
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {props.user.cartDetail.map((product) => (
                <tr key={product._id}>
                  <td>{product.title}</td>
                  <td>{product.price}$</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(product._id)}>
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <TotalPrice>Total Price: {Total}$</TotalPrice>
          <Button>구매하기</Button>
        </>
      ) : (
        <div>no</div>
      )}
    </Wrapper>
  );
};

export default CartPage;
