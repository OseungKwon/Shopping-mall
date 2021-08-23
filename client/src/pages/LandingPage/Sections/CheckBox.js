import React, { useState } from "react";
import styled from "styled-components";

const BoxArea = styled.div`
  flex: 1;
  border: 1px solid #0078ff;
  border-radius: 5px;
  margin: 0.5rem;
  display: flex;
  height: 5rem;
`;

const BoxName = styled.div`
  flex: 1;
  border-right: 3px solid rgba(0, 120, 255, 0.7);
  font-weight: bold;
  font-size: 1rem;
  color: #0078ff;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
`;
const BoxInfo = styled.div`
  margin: 0.3rem;
  flex: 5;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const continents = [
  {
    _id: 1,
    name: "black"
  },
  {
    _id: 2,
    name: "white"
  },
  {
    _id: 3,
    name: "brown"
  },
  {
    _id: 4,
    name: "gray"
  }
];

//<input type="checkbox" id="a" /> <label for="a">LOREM</label>
const CheckBox = (props) => {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentTarget = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentTarget === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentTarget, 1);
    }
    setChecked(newChecked);
    props.handleFilter(newChecked);
  };

  return (
    <BoxArea>
      <BoxName>continents</BoxName>
      <BoxInfo>
        {continents.map((value, index) => (
          <span key={index}>
            <input
              type="checkbox"
              id="continents"
              onChange={() => handleToggle(value._id)}
              checked={Checked.indexOf(value._id) === -1 ? false : true}
            />
            <span style={{ marginLeft: "0.1rem" }}>{value.name}</span>
          </span>
        ))}
      </BoxInfo>
    </BoxArea>
  );
};

export default CheckBox;
