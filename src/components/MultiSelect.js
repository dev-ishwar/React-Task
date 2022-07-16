import { Autocomplete, TextField, Checkbox, Button, Box } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState, Fragment } from "react";
import DisplayRecords from "./DisplayRecords";
import { SearchSwitch } from "./muiFeatures";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    console.log("temp useeffect values", temp);
    setValues(temp);
  }, [optionList]);

  // useEffect(() => {
  //   const temp = !multiselect
  //     ? optionList.filter((item) => item.id !== 0)
  //     : optionList.splice(0, 0, {
  //         id: 0,
  //         title: "Select All",
  //         year: "",
  //         isChecked: false,
  //       });
  //   console.log("optionlist temp", temp);
  //   // setOptionList(temp);
  // }, [multiselect]);

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

  const updateHandler = (flag, id) => {
    const temp = optionList.map((item, index) =>
      item.id === id ? { ...item, isChecked: flag } : item
    );
    if (Array.isArray(temp) && temp.length > 0) {
      console.log(temp);
      setOptionList(temp);
    }
  };

  const selectAll = (newValue) => {
    const temp = optionList.map((item, index) => ({
      ...item,
      isChecked: newValue,
    }));
    if (Array.isArray(temp) && temp.length > 0) {
      console.log(temp);
      setOptionList(temp);
      setValues(temp);
    }
  };

  const multiselectHandler = () => {
    setMultiselect(!multiselect);
  };

  const autoCompleteComponent = (
    <Autocomplete
      fullWidth
      key={multiselect}
      multiple={multiselect}
      options={optionList}
      disableCloseOnSelect={multiselect}
      value={multiselect ? values : singleMovie}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(e, newValue) => {
        console.log("new value", newValue);
        // setValues(newValue);
        if (multiselect === false) {
          // const temp = [];
          // temp.push(newValue);
          // console.log("singlemovie temp", temp);
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
            console.log("temp", temp);
            setOptionList(temp);
          }
        }
      }}
      autoComplete={false}
      getOptionLabel={(option) => (option?.title ? option.title : "")}
      renderInput={(params) => (
        <TextField {...params} label="Select multiple values!" />
      )}
      renderOption={(props, option, { selected }) => {
        return (
          <Fragment key={option.id}>
            {(option.id !== 0 || multiselect) && (
              <Box
              // onClick={() =>
              //   option.id === 0
              //     ? selectAll(!option.isChecked)
              //     : updateHandler(!option.isChecked, option.id)
              // }
              >
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
          <Box sx={{ display: "flex" }}>
            {React.cloneElement(
              autoCompleteComponent,
              SearchFlag && {
                filterOptions: (x) => x,
              }
            )}

            <FormControlLabel
              sx={{ mx: "1rem" }}
              control={<SearchSwitch defaultChecked onChange={searchHandler} />}
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
          {/* <Button
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
          </Button> */}
        </form>

        {submitted && multiselect && <DisplayRecords values={displayValues} />}
      </Container>
    </>
  );
};

export default MultiSelect;
