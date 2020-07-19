import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

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
    props.list.map((value, idx) => (
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
        <Panel header="Continents Kind" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBoxGroup;
