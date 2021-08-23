import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 6rem auto;
  width: 250px;
  & > h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    overflow: visible;
  }
`;

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
  & > span {
    font-size: 0.8rem;
  }
  & > input {
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
  }
`;
export const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 0.4rem;
  background: #0078ff;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const AuthForm = ({ type, onSubmit, onChange }) => {
  return (
    <Wrapper>
      {type === "login" ? <h2>로그인</h2> : <h2>계정 만들기</h2>}
      <form onSubmit={onSubmit}>
        {type === "register" ? (
          <InputForm>
            <span>이름</span>
            <input
              type="text"
              placeholder="이름"
              id="name"
              onChange={onChange}
            />
          </InputForm>
        ) : (
          <div></div>
        )}
        <InputForm>
          <span>이메일</span>
          <input
            type="text"
            placeholder="이메일"
            id="email"
            onChange={onChange}
          />
        </InputForm>
        <InputForm>
          <span>비밀번호</span>
          <input
            type="password"
            placeholder="비밀번호"
            id="password"
            onChange={onChange}
          />
        </InputForm>
        {type === "register" ? (
          <>
            <InputForm>
              <span>비밀번호 확인</span>
              <input
                type="password"
                placeholder="비밀번호 확인"
                id="passwordConfirm"
                onChange={onChange}
              />
            </InputForm>
            <Button>계정 만들기</Button>
          </>
        ) : (
          <Button>로그인</Button>
        )}
      </form>
    </Wrapper>
  );
};

export default AuthForm;
