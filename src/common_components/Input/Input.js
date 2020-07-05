import React from "react";
import { Input, Label } from "reactstrap";

const CommonInput = props => {
  const { label, type, placeholder, onChange, value, id, min } = props;
  return (
    <>
      <Label>{label}</Label>
      <Input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e)}
        min={min}
      />
    </>
  );
};
export default CommonInput;
