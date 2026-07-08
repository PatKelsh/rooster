"use client";

import { useEffect, useState } from "react";
import { Autocomplete as AutocompleteComponent, 
  FormHelperText
} from "@mui/material";
import TextField from "@mui/material/TextField";

interface AutoCompleteProps {
  options: { id: string; name: string }[];
  label: string;
  name: string;
  initialValue?: string;
  disabled?: boolean;
  resetInitialValue?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Autocomplete = ({
  options,
  label,
  name,
  initialValue,
  disabled = false,
  resetInitialValue = false,
  handleChange }: AutoCompleteProps) => {
  const [value, setValue] = useState<string>(initialValue || "");
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const setInitialValue = () => {
      if (initialValue) {
        const matchingOption = options.find(option => option.id === initialValue);
        setValue(matchingOption ? matchingOption.name : "");
      } else {
        setValue("");
      }
    };

    if (resetInitialValue) {
      setInitialValue();
    }
  }, [initialValue, resetInitialValue, options]);

  return (
    <>
      <FormHelperText>
        {label}
      </FormHelperText>
      <AutocompleteComponent
        disabled={disabled}
        disablePortal
        id={`${name}-autocomplete`}
        options={options.map(option => option.name)}
        sx={{ width: "100%" }}
        value={value}
        onChange={(_, newValue: string | null) => {
          setValue(newValue || "");
          if (handleChange) {
            const selectedOption = options.find(option => option.name === newValue);
            const syntheticEvent = {
              target: {
                name,
                value: selectedOption ? selectedOption.id : ""
              }
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange(syntheticEvent);
          }
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params}
            name={name}
            disabled={disabled}
          />
        )}
      />
    </>
  )
}

export default Autocomplete;