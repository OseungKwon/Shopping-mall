import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { Button } from "../../components/commonStyle";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import Search from "./Sections/Search";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  margin: 6rem auto;
  width: 80%;
`;
const ProductsBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
  & > div {
    border: 1px solid #d3d3d3;
    height: 24rem;
    border-radius: 1px;
    //padding: 2rem;
    margin: 1rem;
    &:hover {
      transform: scale(1.01);
      border: 1px solid black;
    }
  }
`;
const ProductCard = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  color: black;
  & > a {
    color: black;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0.5rem;
`;

const Sub = styled.div``;

const Select = styled.div`
  display: flex;
  @media screen and (max-width: 1025px) {
    flex-direction: column;
  }
`;

const price = [
    {
        _id: 0,
        name: "Any",
        array: []
    },
    {
        _id: 1,
        name: "$0 to $199",
        array: [0, 199]
    },
    {
        _id: 2,
        name: "$200 to $249",
        array: [200, 249]
    },
    {
        _id: 3,
        name: "$250 to $279",
        array: [250, 279]
    },
    {
        _id: 4,
        name: "$280 to $299",
        array: [280, 299]
    },
    {
        _id: 5,
        name: "More than $300",
        array: [300, 1500000]
    }
];

const Landing = () => {
    const [Products, setProducts] = useState("");
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState();
    const [SearchTerms, setSearchTerms] = useState("");

    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    });

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit
        };

        getProducts(variables);
    }, [Limit, Skip]);

    const getProducts = (variables) => {
        Axios.post("/api/product/getProducts", variables).then((response) => {
            if (response.data.success) {
                if (variables.loadMore) {
                    setProducts([...Products, ...response.data.products]);
                } else {
                    setProducts(response.data.products);
                }
                setPostSize(response.data.postSize);
            } else {
                alert("Failed to fectch product datas");
            }
        });
    };

    const onLoadMore = () => {
        let skip = Skip + Limit; // Skip: 0, Limit: 8
        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            searchTerm: SearchTerms
        };
        getProducts(variables);
        setLimit(skip);
    };

    const handleFilter = (filters, category) => {
        const newFilters = { ...Filters };
        newFilters[category] = filters;

        if (category === "price") {
            for (let key in price) {
                if (price[key]._id === parseInt(filters, 10)) {
                    newFilters[category] = price[key].array;
                }
            }
        }
        const data = {
            skip: 0,
            limit: Limit,
            filters: newFilters
        };
        getProducts(data);

        console.log(data);
        setFilters(newFilters);
    };

    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        };

        setSkip(0);
        setSearchTerms(newSearchTerm);

        getProducts(variables);
    };

    return (
        <Wrapper>
            <Search refreshFunction={updateSearchTerms} />
            <Select>
                {/* <CheckBox
          handleFilter={(filters) => handleFilter(filters, "continents")}
        /> */}
                <RadioBox handleFilter={(filters) => handleFilter(filters, "price")} />
            </Select>

            {Products.length === 0 ? (
                <div>No data</div>
            ) : (
                <ProductsBlock>
                    {Products.map((product) => (
                        <ProductCard key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <img
                                    src={`http://localhost:5000/${product.images}`}
                                    alt="img"
                                    style={{
                                        width: "100%",
                                        height: "18rem",
                                        objectFit: "cover"
                                    }}
                                ></img>
                                <Title>{product.title}</Title>
                                <Sub>{product.price} $</Sub>
                            </Link>
                        </ProductCard>
                    ))}
                </ProductsBlock>
            )}
            <div>
                {PostSize >= Limit && (
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "2rem"
                        }}
                    >
                        <Button
                            onClick={onLoadMore}
                            style={{ maxWidth: "10rem", background: "rgba(0,12,255,0.3)" }}
                        >
                            더보기
                        </Button>
                    </div>
                )}
            </div>
        </Wrapper>
    );
};

export default React.memo(Landing);
