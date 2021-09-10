import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../_actions/user_actions";

import { Button } from "../common/commonStyle";
import { Wrapper, Table, TotalPrice } from "./CartStyle";

const Cart = (props) => {
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
  }, [dispatch]);

  const calculateTotal = useCallback((cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  }, []);

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

export default Cart;
