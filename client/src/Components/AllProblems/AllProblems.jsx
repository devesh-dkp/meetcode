import React, { useEffect, useState } from "react";

import "./AllProblems.css";
import { backendUrl } from "../../constants.js";
import Footer from "../../Constants/Footer/Footer.jsx";

const AllProblemsPage = () => {
  const [problems, setProblems] = useState([]);

  const init = async () => {
    const response = await fetch(`${backendUrl}/problems`, {
      method: "GET",
    });

    const json = await response.json();
    setProblems(json.problems);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div id="allproblems">
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Acceptance</th>
          </tr>

          {problems.map((prob, index) => (
            <tr key={index}>
              <td className={`${prob.problemId}`}>{prob.problemId}</td>
              <td
                className="title"
                onClick={() => {
                  window.location.href = `/problems/:${prob.problemId}`;
                }}
              >
                {prob.title}
              </td>
              {/* </Link> */}
              <td className={`${prob.difficulty}`}>{prob.difficulty}</td>
              <td className={`${prob.acceptance}`}>{prob.acceptance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProblemsPage;
