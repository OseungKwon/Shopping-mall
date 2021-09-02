import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "../../components/commonStyle";
import { useDispatch } from "react-redux";
import { addToCart } from "../../_actions/user_actions";
import { Wrapper, ItemTitle, ItemInfo, ItemDescription, LeftSide, RightSide } from "./ProductStyle";


const Product = ({ history, match }) => {
    const dispatch = useDispatch();

    const productId = match.params.productId;
    const [Product, setProduct] = useState([]);

    //
    useEffect(() => {
        // 제품 아이디를 키로 가지고 있는 Session Storage 존재하지 않으면,
        if (window.sessionStorage.getItem(productId) === null) {
            const getInfo = async () => {
                console.log(productId);
                // Axios를 통해 서버에서 제품 데이터를 받아온다.
                Axios.get(
                    `/api/product/products_by_id?id=${productId}&type=single`
                ).then((response) => {
                    // 받아온 데이터를 useState(Product,setProduct)에 저장
                    setProduct(response.data[0]);
                    console.log("성공");
                });
            };
            getInfo();
            // 제품 아이디를 키로 가지고 있는 Session Storage 존재하면,
        } else {
            // sessionStorage에서 데이터를 받아와 seProduct해준다.
            const getData = JSON.parse(window.sessionStorage.getItem(productId));
            setProduct(getData);
        }
    }, [productId]);

    // useState는 비동기적으로 작동해 useEffect를 사용해야 한다.
    useEffect(() => {
        // 페이지에 접속했을 때, Product는 []과 같이 초기화된 상태이므로 예외 처리
        if (Product.length !== 0) {
            // 제품 아이디를 키로 가지고 있는 Session Storage 존재하지 않으면,
            if (window.sessionStorage.getItem(productId) === null) {
                // Product 데이터를 sessionStorage에 제품아이디를 키로 하여 저장시킨다.
                const data = JSON.stringify(Product);
                window.sessionStorage.setItem(productId, data);
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
        history.push("/");
    };
    console.log(Product);
    return (
        <Wrapper>
            <ItemTitle>{Product.title}</ItemTitle>
            <ItemInfo>
                <LeftSide>
                    <img
                        src={`http://localhost:5000/${Product.images}`}
                        alt="이미지 어디감"
                    ></img>
                </LeftSide>
                <RightSide>
                    <div>가격: {Product.price}$</div>
                    <div>판매 횟수: {Product.sold}</div>
                    <div>조회수: {Product.views}</div>
                    <ItemDescription>{Product.description}</ItemDescription>
                    <Button onClick={addToCartHandler}>쇼핑카트에 담기</Button>
                </RightSide>
            </ItemInfo>
        </Wrapper>
    );
};

export default Product;
