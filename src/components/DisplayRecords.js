import * as React from "react";
//MUI imports
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//import components
import { Toggle } from "./muiFeatures";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

//Component
const DisplayRecords = ({ values }) => {
  const [secondary, setSecondary] = React.useState(true);

  {
    values.length > 0 && console.log("values", values);
  }
  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          List of last submitted records...
        </Typography>

        {/* <Toggle setSecondary={setSecondary} text="Display/Hide the year" /> */}

        <Demo>
          <List>
            {values.map((value, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={value.title || value}
                  // secondary={secondary ? value.year || "" : null}
                />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </>
  );
};

export default DisplayRecords;
