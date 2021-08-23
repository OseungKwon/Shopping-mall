import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Axios from "axios";
import * as FaIcons from "react-icons/fa";
import { USER_SERVER } from "../modules/utils/Config";

const TopBarBox = styled.div`
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  height: 3rem;
  width: 100%;
  border-bottom: 3px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftSide = styled.div`
  margin-left: 2rem;
  & > a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    color: gray;

    & > div {
      color: black;
      margin-right: 0.5rem;
    }
  }
`;
const RightSide = styled.div`
  position: relative;
  margin-right: 3rem;
  @media screen and (max-width: 600px) {
    margin-right: 1rem;
  }
  & > :nth-child(1) {
    background: #0078ff;
    color: white;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  & > a {
    margin-left: 1rem;
    text-decoration: none;
    font-size: 1rem;
    color: #0078ff;
    font-weight: bold;
    &:hover {
      color: gray;
    }
  }
`;

const Badge = styled.div`
  position: absolute;
  left: 3.5rem;
  top: -0.5rem;
  color: white;
  width: 1rem;
  height: 1rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ff4040;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Profile = styled.span`
  margin-left: 2rem;
  font-weight: bold;
  font-size: 1rem;
  color: gray;
`;

// try
const SideBar = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  background: white;
  border-bottom: 2px solid #0078ff;
  top: 3rem;
  left: 0;
  width: 100vw;
  padding: 0.5rem;
  & > :nth-child(1) {
    background: #0078ff;
    color: white;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  & > a {
    margin-left: 1rem;
    text-decoration: none;
    font-size: 1rem;
    color: #0078ff;
    font-weight: bold;
    &:hover {
      color: gray;
    }
  }
`;

const SideButton = styled.div`
  width: 1.8rem;
  height: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const NormalState = styled.div`
  margin-right: 3rem;
  & > :nth-child(1) {
    background: #0078ff;
    color: white;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  & > a {
    margin-left: 1rem;
    text-decoration: none;
    font-size: 1rem;
    color: #0078ff;
    font-weight: bold;
    &:hover {
      color: gray;
    }
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const TopBar = (props) => {
  const user = useSelector((state) => state.user);
  const [ShowSideBar, setShowSideBar] = useState(false);

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  return (
    <TopBarBox>
      <LeftSide>
        <Link to="/">
          <div>Jamong </div>shop
        </Link>
      </LeftSide>
      <RightSide>
        {user.userData && user.userData.isAuth ? (
          <>
            <SideButton>
              <FaIcons.FaBars onClick={() => setShowSideBar(!ShowSideBar)} />
            </SideButton>

            {ShowSideBar ? (
              <SideBar>
                <>
                  <Link to="/user/cart">Cart</Link>
                  {user.userData.cart ? (
                    <Badge>{user.userData.cart.length}</Badge>
                  ) : (
                    <></>
                  )}
                  <Link to="/product/upload">Upload</Link>
                  <Link to="/logout" onClick={logoutHandler}>
                    Logout
                  </Link>
                </>
              </SideBar>
            ) : (
              <NormalState>
                <Link to="/user/cart">Cart</Link>
                {user.userData.cart ? (
                  <Badge>{user.userData.cart.length}</Badge>
                ) : (
                  <></>
                )}
                <Link to="/product/upload">Upload</Link>
                <Link to="/logout" onClick={logoutHandler}>
                  Logout
                </Link>
                <Profile>{user.userData.name}</Profile>
              </NormalState>
            )}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </RightSide>
    </TopBarBox>
  );
};

export default withRouter(TopBar);
