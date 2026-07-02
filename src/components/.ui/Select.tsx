"use client";

import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  small?: boolean;
  topBottomMargin?: boolean;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const Select = ({ label, options, value, small = false, topBottomMargin = false, onChange }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="text-field-container">
      <FormControl size={small ? "small" : "medium"}>
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <MuiSelect
          inputProps={{MenuProps: {disableScrollLock: true}}}
          labelId={`${label}-label`}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
            onChange(event);
          }}
          open={isOpen}
          onClose={handleToggle}
          onOpen={handleToggle}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
};

export default Select;