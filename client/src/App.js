import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Container from "@material-ui/core/Container";
import { Header, HeadSection } from "./Components/Header";
import Editor from "./Components/Editor";
import EditorInput from "./Components/EditorInput";
import LogsOutput from "./Components/LogsOutput";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [outputLogs, setOutputLogs] = useState("");
  const [outputMsg, setOutputMsg] = useState("");
  const [status, setStatus] = useState("Run");

  // run button callback
  const runCode = () => {
    setStatus("Loading...");
    axios
      .post("https://compile-it-hritikhrk.herokuapp.com/run", { language, code, input })
      .then((res) => {
        if (res.data.memory && res.data.cpuTime) {
          setOutputLogs("");
          setOutputLogs(`${res.data.output} `);
          setOutputMsg(
            `Memory Used: ${res.data.memory} KB \n CPU Time: ${res.data.cpuTime} Sec`
          );
        } else {
          setOutputLogs(`${res.data.output} `);
        }
        setStatus("Run");
      });
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <HeadSection
          value={language}
          status={status}
          runCode={() => runCode()}
          onChangeLanguage={(value) => setLanguage(value)}
        />
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Editor
              value={code}
              onCodeChange={(text) => setCode(text)}
              programmingLanguage={language}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <EditorInput
              value={input}
              onInputChange={(text) => setInput(text)}
            />
            <br />
            <LogsOutput value={outputLogs} />
            <br />
            <Typography variant="subtitle1" gutterBottom>
              {outputMsg}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
