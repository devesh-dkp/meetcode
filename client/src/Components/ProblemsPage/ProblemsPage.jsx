import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Reactmarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ProblemsPage.css";
import { backendUrl } from "../../constants.js";
import { Box, HStack, Button, useToast } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, LANGAUGE_IDS } from "../../constants";
const ProblemsPage = () => {
  const toast = useToast();
  const editorRef = useRef();
  const { pid } = useParams();
  const cleanId = pid.substring(1);
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(0);
  const [result, setResult] = useState("Run the code to see the output");
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
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Please login to submit the code",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    if (!sourceCode) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          languageId: LANGAUGE_IDS[language],
          sourceCode: sourceCode,
          problemId: cleanId,
        }),
      });
      const json = await response.json();
      const status = json.status;
      setResult(status);
      setIsLoading(false);
      toast({
        title: "Code submitted successfully",
        description: status,
        status: (status === "Accepted" && "success") || "error",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "An error occurred.",
        description: "Please try again later",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="problems-page">
      {problem ? (
        <div id="problempage" className="flex-row">
          <div className="ques">
            <h1 className="title">{problem.title}</h1>
            <h2 className="bold">Description</h2>
            <Reactmarkdown remarkPlugins={[remarkGfm]}>
              {problem.description}
            </Reactmarkdown>
            <h2 className="bold">
              First line of input contains a single integer t, the number of
              test cases.
            </h2>
            <h2 className="bold">Input</h2>
            <Reactmarkdown remarkPlugins={[remarkGfm]}>
              {problem.exampleIn}
            </Reactmarkdown>
            <h2 className="bold">Output</h2>
            <Reactmarkdown remarkPlugins={[remarkGfm]}>
              {problem.exampleOut}
            </Reactmarkdown>
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
                      colorScheme="teal"
                      bg={"green.100"}
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
              <div>{result}</div>
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
