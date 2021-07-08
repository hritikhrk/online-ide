// Library Imports
import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const EditorInput = ({ value, onInputChange }) => {
  return (
    <div className="InputEditor">
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        value={value}
        onChange={(event)=>onInputChange(event.target.value)}
      />
    </div>
  );
};

export default EditorInput;
