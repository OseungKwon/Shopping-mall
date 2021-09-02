import React from "react";
import { Wrapper, InputForm, Button } from "../common/commonStyle";


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
