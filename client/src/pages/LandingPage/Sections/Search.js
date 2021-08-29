import React, { useState } from "react";
import styled from "styled-components";

const SearchItem = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

const InputBox = styled.input`
  padding-left: 1rem;
  width: 30rem;
  height: 3rem;
  border: 1px solid #cacaca;
  outline: none;
  margin: 2rem;
  &::placeholder {
    color: #a5a5a5;
  }
`;

const Search = (props) => {
  const [SearchTerms, setSearchTerms] = useState();
  const onChangeSearch = (e) => {
    setSearchTerms(e.target.value);
    props.refreshFunction(e.currentTarget.value);
  };

  return (
    <SearchItem>
      <InputBox
        value={SearchTerms}
        onChange={onChangeSearch}
        placeholder="상품을 검색해 보세요"
      />
    </SearchItem>
  );
};

export default React.memo(Search);
