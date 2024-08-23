import { useState } from "react";
import { Input } from "antd";

export default function SearchBar() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (value) => {
    //console.log(value);
  };

  return (
    <Input.Search
      placeholder="Search"
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      enterButton
      style={{ width: "1520px" }}
    />
  );
}