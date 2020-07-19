import React, { useState } from "react";
import { Radio, Collapse } from "antd";

const { Panel } = Collapse;

function RadioBox(props) {
  const [Checked, setChecked] = useState(0);

  const onHandleChange = e => {
    setChecked(e.target.value);

    props.handleFilters(e.target.value);
  };

  const renderRadioBox = props.list.map((value, idx) => (
    <Radio key={idx} value={value._id}>
      {value.name}
    </Radio>
  ));

  return (
    <Collapse defaultActiveKey={["0"]}>
      <Panel header="Price Range" key={1}>
        <Radio.Group onChange={onHandleChange} value={Checked}>
          {renderRadioBox}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
}

export default RadioBox;
