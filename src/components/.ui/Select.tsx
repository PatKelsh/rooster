"use client";

import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  FormHelperText
} from "@mui/material";

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  small?: boolean;
  topBottomMargin?: boolean;
  formHelperText?: boolean;
}

const Select = ({
  label, options, value, small = false, onChange, formHelperText = false }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="text-field-container">
      {formHelperText && (
        <FormHelperText>
          {label}
        </FormHelperText>
      )}
      <FormControl size={small ? "small" : "medium"}>
        {!formHelperText && <InputLabel id={`${label}-label`}>{label}</InputLabel>}
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