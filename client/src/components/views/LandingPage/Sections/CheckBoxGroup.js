import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;
const continents = [
  { _id: 1, name: "Africa" },
  { _id: 2, name: "Europe" },
  { _id: 3, name: "Asia" },
  { _id: 4, name: "North America" },
  { _id: 5, name: "South America" },
  { _id: 6, name: "Australia" },
  { _id: 7, name: "Antarctica" }
];

function CheckBoxGroup(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = id => {
    const currentIndex = Checked.indexOf(id);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    // update this checked information into parent Component
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    continents.map((value, idx) => (
      <React.Fragment key={idx}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBoxGroup;
