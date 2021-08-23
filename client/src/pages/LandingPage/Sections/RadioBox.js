import React, { useState } from "react";
import styled from "styled-components";

import { Radio, Collapse } from "antd";
import "antd/dist/antd.css";
const { Panel } = Collapse;

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
  align-content: center;
  align-content: space-around;
  & > span {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
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

const RadioBox = (props) => {
  const [Price, setPrice] = useState(0);

  const handleChange = (e) => {
    setPrice(e.target.value);
    props.handleFilter(e.target.value);
  };

  return (
    <BoxArea>
      <BoxName>price</BoxName>
      <BoxInfo onChange={handleChange} value={Price}>
        {price.map((value, index) => (
          <span key={index}>
            <input
              type="radio"
              id="continents"
              value={`${value._id}`}
              name="radioGroup"
              defaultChecked={value._id === 0}
            />
            <span style={{ marginLeft: "0.1rem" }}>{value.name}</span>
          </span>
        ))}
      </BoxInfo>
    </BoxArea>
  );
};

export default RadioBox;
// const RadioBox = (props) => {
//   const [Price, setPrice] = useState("0");

//   const handleChange = (e) => {
//     setPrice(e.target.value);
//     props.handleFilter(e.target.value);
//   };
//   return (
//     <Collapse defaultActiveKey={[0]}>
//       <Panel header="price">
//         <Radio.Group onChange={handleChange} value={Price}>
//           {price.map((value) => (
//             <Radio key={value._id} value={`${value._id}`}>
//               {value.name}
//             </Radio>
//           ))}
//         </Radio.Group>
//       </Panel>
//     </Collapse>
//   );
// };

// export default RadioBox;
