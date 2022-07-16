import React, { useState } from "react";
import {
  Autocomplete,
  Container,
  TextField,
  Box,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import { SearchSwitch } from "./muiFeatures";
import DisplayRecords from "./DisplayRecords";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

//Component
const SelectSimpleArray = ({ data }) => {
  const [values, setValues] = useState([]);
  const [multiselect, setMultiselect] = useState(true);
  const [search, setSearch] = useState(true);
  const [lastSubmitted, setLastSubmitted] = useState([]);
  const [submitted, setsubmitted] = useState(false);

  console.log("second values:", values);

  const handleMultiselect = (e) => {
    setValues([]);
    setMultiselect(!multiselect);
  };

  const submitForm = () => {
    if (values.length > 0) {
      setsubmitted(true);
      setLastSubmitted([...values]);
      setValues([]);
    } else {
      return;
    }
  };

  const clearSelection = () => {
    setValues([]);
  };

  const autoCompleteComponent = (
    <Autocomplete
      fullWidth
      options={data}
      multiple={multiselect}
      value={values}
      disableCloseOnSelect={multiselect}
      onChange={(e, newValue) => setValues(newValue)}
      getOptionLabel={(option) => option.title ?? option}
      renderInput={(props) => <TextField {...props} placeholder="Select" />}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          {multiselect && (
            <Checkbox checked={selected} icon={icon} sx={{ mr: "8px" }} />
          )}
          {option.title ?? option}
        </li>
      )}
    />
  );

  return (
    <Container maxWidth={"md"}>
      <Box sx={{ display: "flex" }}>
        {React.cloneElement(
          autoCompleteComponent,
          !search && { filterOptions: (x) => x }
        )}
        <FormControlLabel
          sx={{ mx: "1rem" }}
          control={
            <SearchSwitch defaultChecked onChange={() => setSearch(!search)} />
          }
          label="Search"
        />
        <FormControlLabel
          sx={{ mx: "1rem" }}
          control={<SearchSwitch defaultChecked onChange={handleMultiselect} />}
          label="Multiselect"
        />
      </Box>
      {multiselect && (
        <>
          <Button
            onClick={submitForm}
            variant={"outlined"}
            sx={{ m: "1rem", px: "1.5rem" }}
          >
            Submit
          </Button>
          <Button
            onClick={clearSelection}
            variant={"outlined"}
            sx={{ m: "1rem", px: "1.5rem" }}
          >
            Clear
          </Button>
        </>
      )}

      {submitted && multiselect && <DisplayRecords values={lastSubmitted} />}
    </Container>
  );
};

export default SelectSimpleArray;
