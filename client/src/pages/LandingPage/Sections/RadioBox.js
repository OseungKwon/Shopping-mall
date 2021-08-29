import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import "antd/dist/antd.css";
import { Select } from "antd";

const { Option, OptGroup } = Select;

const BoxArea = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  margin: 1rem;

  > * > * {
    border: 1px solid #cacaca;
    border-radius: 0;
    width: 12rem;
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

  const handleChange = (value) => {
    console.log(value);
    props.handleFilter(value);
  };
  console.log(price[0]);

  return (
    <BoxArea>
      <Select
        showSearch
        placeholder="Price"
        onChange={handleChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <OptGroup label="Price">
          {price.map((value) => (
            <Option key={value._id} value={`${value._id}`} id="price">
              {value.name}
            </Option>
          ))}
        </OptGroup>
      </Select>
    </BoxArea>
  );
};

export default React.memo(RadioBox);
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
