import { Autocomplete, TextField, Checkbox, Button, Box } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState, Fragment } from "react";
import DisplayRecords from "./DisplayRecords";
import { SearchSwitch } from "./muiFeatures";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

//Multiselect component
const MultiSelect = ({ data }) => {
  const [values, setValues] = useState([]);
  const [submitted, setsubmitted] = useState(false);
  const [displayValues, setDisplayValues] = useState([]);
  const [SearchFlag, setSearchFlag] = useState(false);
  const [optionList, setOptionList] = useState(data);
  const [multiselect, setMultiselect] = useState(true);
  const [singleMovie, setSingleMovie] = useState({});

  useEffect(() => {
    const temp = optionList.filter(
      (item) => item.isChecked === true && item.id !== 0
    );
    setValues(temp);
  }, [optionList]);

  const submitForm = (e) => {
    if (values.length > 0) {
      setsubmitted(true);
      setDisplayValues([...values]);
      setValues([]);
    }
    const temp = optionList.map((item) =>
      item.isChecked === true ? { ...item, isChecked: false } : item
    );
    setOptionList(temp);
  };

  const clearSelection = (e) => {
    setValues([]);
    const temp = optionList.map((item) =>
      item.isChecked === true ? { ...item, isChecked: false } : item
    );
    setOptionList(temp);
  };

  const searchHandler = (e) => {
    setSearchFlag(!SearchFlag);
  };

  const selectAll = (newValue) => {
    const temp = optionList.map((item, index) => ({
      ...item,
      isChecked: newValue,
    }));
    if (Array.isArray(temp) && temp.length > 0) {
      setOptionList(temp);
      setValues(temp);
    }
  };

  const multiselectHandler = () => {
    setMultiselect(!multiselect);
  };

  const autoCompleteComponent = (
    <Autocomplete
      sx={{ mb: "0.75rem" }}
      fullWidth
      key={multiselect}
      multiple={multiselect}
      options={optionList}
      disableCloseOnSelect={multiselect}
      value={multiselect ? values : singleMovie}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(e, newValue) => {
        if (multiselect === false) {
          setSingleMovie(newValue);
        } else {
          const foundSelectAll = newValue.find((value) => value.id === 0);
          if (foundSelectAll) {
            selectAll(!foundSelectAll.isChecked);
          } else {
            const temp = optionList.map((item) =>
              item.id === newValue.find((row) => row.id === item.id)?.id
                ? { ...item, isChecked: true }
                : { ...item, isChecked: false }
            );
            setOptionList(temp);
          }
        }
      }}
      autoComplete={false}
      getOptionLabel={(option) => (option?.title ? option.title : "")}
      renderInput={(params) => <TextField {...params} label="Select All" />}
      renderOption={(props, option, { selected }) => {
        return (
          <Fragment key={option.id}>
            {(option.id !== 0 || multiselect) && (
              <Box>
                <li {...props}>
                  {multiselect && (
                    <Checkbox checked={option.isChecked} icon={icon} />
                  )}

                  {option.title || option}
                </li>
              </Box>
            )}
          </Fragment>
        );
      }}
    />
  );

  return (
    <>
      <Container maxWidth={"md"} sx={{ mt: "2rem", p: "1rem" }}>
        <form>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
          >
            {React.cloneElement(
              autoCompleteComponent,
              SearchFlag && {
                filterOptions: (x) => x,
              }
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: { sm: "row" },
              }}
            >
              <FormControlLabel
                sx={{ mx: "1rem" }}
                control={
                  <SearchSwitch defaultChecked onChange={searchHandler} />
                }
                label="Search"
              />
              <FormControlLabel
                sx={{ mx: "1rem" }}
                control={
                  <SearchSwitch defaultChecked onChange={multiselectHandler} />
                }
                label="Multiselect"
              />
            </Box>
          </Box>
          {multiselect && (
            <Box>
              <Button
                onClick={submitForm}
                variant={"outlined"}
                sx={{ m: "1.5rem", px: "2rem" }}
              >
                Submit
              </Button>
              <Button
                onClick={clearSelection}
                variant={"outlined"}
                sx={{ m: "1.5rem", px: "2rem" }}
              >
                Clear
              </Button>
            </Box>
          )}
        </form>
        {submitted && multiselect && <DisplayRecords values={displayValues} />}
      </Container>
    </>
  );
};

export default MultiSelect;
