import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import "./ProblemsPage.css"
import {backendUrl} from "../../constants.js";


const ProblemsPage = () => {
  const [CodeSeg, setCodeSeg] = useState("") ;
  const { pid } = useParams() ;
  const cleanId = pid.substring(1) ;
  const [problem, setProblem] = useState(null);
  const [submission, setSubmission] = useState("");
  const [loading, setLoading] = useState(0);
  const [result, setResult] = useState("");

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

  const handleKey = (event) => {
    if (event.key == "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.target;
      const val =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionStart);
      event.target.value = val;
      event.target.selectionStart = event.target.selectionEnd =
        selectionStart + 1;
    }
    setCodeSeg(event.value);
  };

  setTimeout(() => {
    if (problem == null) {
      setLoading(1);
    }
  }, 2000);

  const handleSubmission = async () => {
    const response = await fetch(`${backendUrl}/submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        problemId: cleanId,
        submission: submission,
      }),
    });

    const json = await response.json();
    console.log(json);

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
    }
  };

  return (
    <div>
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
            <div className="code-header">
              <button type="submit" id="submit" onClick={handleSubmission}>
                Submit
              </button>
              <h2>Code Here</h2>
            </div>
            <div className="code-form">
              <textarea
                onChange={(e) => setSubmission(e.target.value)}
                name="SolvedCode"
                onKeyDown={(event) => handleKey(event)}
              ></textarea>
            </div>
            {/* status area show loading button if loading else show the result */}
            {result !== "" && (
              <div className="status">
                <h3>Result : {result}</h3>
              </div>
            )}
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
}

export default ProblemsPage