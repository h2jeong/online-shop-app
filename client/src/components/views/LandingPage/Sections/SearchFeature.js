import React, { useState } from "react";
import Search from "antd/lib/input/Search";

function SearchFeature(props) {
  const [SearchTerms, setSearchTerms] = useState("");
  const onChangeSearch = e => {
    setSearchTerms(e.currentTarget.value);
    props.refreshFunction(e.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={onChangeSearch}
        style={{ width: 200 }}
        value={SearchTerms}
      />
    </div>
  );
}

export default SearchFeature;
