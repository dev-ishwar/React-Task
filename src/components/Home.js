import MultiSelect from "./MultiSelect";
import SelectSimpleArray from "./SelectSimpleArray";
import classes from "./Home.module.css";

//Dummy data imports
import { top100Films } from "../data";
import { components } from "../data";
import { skills } from "../data";
import { Box } from "@mui/material";
import { Container } from "@mui/system";

const TechStack = [
  { title: "React", id: "react" },
  { title: "Angular", id: "angular" },
  { title: "Vue", id: "vue" },
  { title: "Ember", id: "ember" },
];

const Home = () => {
  return (
    <>
      <Container sx={{ mt: "2rem" }}>
        <h2 className={classes.home}>HOME PAGE</h2>
        <Box className={classes.box}>
          <h3 className={classes["dropdown-heading"]}>Dropdown 1</h3>
          <p className={classes["dropdown-instructions"]}>
            This custom select/dropdown supports both a simple array with
            strings and an array of objects. Search and multiselect features of
            the select/dropdown can be controlled with buttons provided on the
            side. Select all option is not available under multiselect feature
            in the dropdown.
          </p>
        </Box>
        <SelectSimpleArray data={skills} />;
        <Box className={classes.box}>
          <h3 className={classes["dropdown-heading"]}>Dropdown 2</h3>
          <p className={classes["dropdown-instructions"]}>
            This custom select/dropdown supports an array of objects. Search and
            multiselect features of the select/dropdown can be controlled with
            buttons provided on the side. Select all option is available under
            multiselect feature in the dropdown.
          </p>
        </Box>
        <MultiSelect data={top100Films} />
      </Container>
    </>
  );
};

export default Home;
