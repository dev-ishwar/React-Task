import * as React from "react";
//MUI imports
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

//import components

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

//Component
const DisplayRecords = ({ values }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{ mt: 4, mb: 2, color: "#888", fontSize: "17px" }}
          variant="h6"
          component="div"
        >
          List of submitted records -
        </Typography>

        <Demo>
          <List sx={{ color: "#555", fontSize: "17px" }}>
            {values.map((value, index) => (
              <ListItem key={index}>
                <ListItemText primary={value.title || value} />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </>
  );
};

export default DisplayRecords;
