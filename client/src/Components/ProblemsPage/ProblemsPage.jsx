import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ProblemsPage.css";
import { backendUrl } from "../../constants.js";
import { Box, HStack, Button, useToast } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";

const ProblemsPage = () => {
  const toast = useToast();
  const editorRef = useRef();
  const { pid } = useParams();
  const cleanId = pid.substring(1);
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(0);
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const init = async () => {
    const response = await fetch(`${backendUrl}/problem/` + cleanId, {
      method: "GET",
    });

    const json = await response.json();
    setProblem(json.problem);
  };

  useEffect(() => {
    init();
  }, []);

  setTimeout(() => {
    if (problem == null) {
      setLoading(1);
    }
  }, 2000);

  const handleSubmission = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    setIsLoading(true);
    const response = await fetch(`${backendUrl}/submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        problemId: cleanId,
        submission: sourceCode,
      }),
    });

    const json = await response.json();
    console.log(json);
    setIsLoading(false);
    if (response.ok) {
      const st = json.status;
      if (st == "AC") {
        setResult("Accepted");
      } else if (st == "WA") {
        setResult("Wrong Answer");
      } else if (st == "TLE") {
        setResult("Time Limit Exceeded");
      } else if (st == "MLE") {
        setResult("Memory Limit Exceeded");
      } else if (st == "RE") {
        setResult("Runtime Error");
      } else if (st == "CE") {
        setResult("Compilation Error");
      } else {
        setResult("Error");
      }
    } else {
      setResult("Error");

      toast({
        title: "An error occurred.",
        description: json.message || "Unable to submit code",
        status: "error",
        duration: 6000,
      });
    }
  };

  return (
    <div className="problems-page">
      {problem ? (
        <div id="problempage" className="flex-row">
          <div className="ques">
            <h1>{problem.title}</h1>
            <h5>Description</h5>
            <p>{problem.description}</p>
            <code>Input : {problem.exampleIn}</code>
            <code>Output : {problem.exampleOut}</code>
          </div>
          <div className="code">
            <Box p={4}>
              <HStack spacing={4}>
                <Box w="100%">
                  <div className="input">
                    <div className="language">
                      <LanguageSelector
                        language={language}
                        onSelect={onSelect}
                      />
                    </div>
                    <Button
                      variant="outline"
                      colorScheme="green"
                      isLoading={isLoading}
                      onClick={handleSubmission}
                      className="run-button"
                      width={44}
                    >
                      Run Code
                    </Button>
                  </div>
                  <Editor
                    options={{
                      minimap: {
                        enabled: false,
                      },
                    }}
                    height="50vh"
                    theme="vs-dark"
                    language={language}
                    defaultValue={CODE_SNIPPETS[language]}
                    onMount={onMount}
                    value={value}
                    onChange={(value) => setValue(value)}
                  />
                </Box>
              </HStack>
            </Box>
            <div className="output">
              <h2>Output:</h2>
              <p>{result}</p>
            </div>
          </div>
        </div>
      ) : (
        // print loading screen for 2 seconds after which print error message
        <div>
          <h1>{loading ? "No such Problem" : "Loading Problem"}</h1>
        </div>
      )}
    </div>
  );
};

export default ProblemsPage;
