import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Container from "@material-ui/core/Container";
import { Header, HeadSection } from "./Components/Header";
import Editor from "./Components/Editor";
import EditorInput from "./Components/EditorInput";
import LogsOutput from "./Components/LogsOutput";

function App() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [outputLogs, setOutputLogs] = useState("");
  const [status, setStatus] = useState("Run");
  let outputLogsMessage = "";

  // run button callback
  const runCode = () => {
    setStatus("Loading...");
    axios
      .post("http://localhost:5000/run", { language, code, input })
      .then((res) => {
        if (res.data.memory && res.data.cpuTime) {
          setOutputLogs("");
          setOutputLogs(
            `Memory Used: ${res.data.memory} \nCPU Time: ${res.data.cpuTime} \n${res.data.output} `
          );
          outputLogsMessage = `Memory Used: ${res.data.memory} \nCPU Time: ${res.data.cpuTime}`;
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
        {language}
        <Editor
          value={code}
          onCodeChange={(text) => setCode(text)}
          programmingLanguage={language}
        />
        {code}
        <EditorInput value={input} onInputChange={(text) => setInput(text)} />
        {input}
        <LogsOutput value={outputLogs} />
        {outputLogsMessage}
      </Container>
    </>
  );
}

export default App;
