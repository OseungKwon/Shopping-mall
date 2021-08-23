import React, { useState } from "react";
import styled from "styled-components";

const SearchItem = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem;
`;

const InputBox = styled.input`
  width: 15rem;
  &::placeholder {
    padding-left: 0.5rem;
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

export default Search;
