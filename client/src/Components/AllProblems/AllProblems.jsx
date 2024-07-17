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
            <th>Title</th>
            <th>Difficulty</th>
            <th>Acceptance</th>
          </tr>

          {problems.map((prob, index) => (
            <tr key={index}>
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
              <td className={`${prob.difficulty}`}>{prob.acceptance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default AllProblemsPage;
