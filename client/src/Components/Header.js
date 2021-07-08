import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Header = function () {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Online IDE</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export const HeadSection = function ({
  onChangeLanguage,
  value,
  runCode,
  status,
}) {
  const classes = useStyles();
  return (
    <div>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={value}
            onChange={(event) => onChangeLanguage(event.target.value)}
            label="Age"
          >
            <MenuItem value={"cpp17"}>c++ 17</MenuItem>
            <MenuItem value={"java"}>Java</MenuItem>
            <MenuItem value={"python3"}>Python</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => runCode()}
        disabled={status === "Run" ? false : true}
        className="customButton"
      >
        {status}
      </Button>
    </div>
  );
};
