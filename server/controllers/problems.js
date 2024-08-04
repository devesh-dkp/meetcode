const problemsRouter = require("express").Router();
const { Buffer } = require("buffer");
const axios = require("axios");
const { auth } = require("../middleware");

const PROBLEMS = [
  {
    problemId: "1",
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "42%",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
      \n You may assume that each input would have exactly one solution, and you may not use the same element twice.
      \n Input: First line contains an integer n, the size of the array. Second line contains n integers, the elements of the array. Third line contains an integer target.`,
    exampleIn: `1
    \n4
    \n2 7 11 15
    \n9`,
    exampleOut: "0 1",
  },
  {
    problemId: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: "34%",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
      \n You may assume the two numbers do not contain any leading zero, except the number 0 itself.
      \n Input: First line contains an integer n, the size of the first linked list. Second line contains n integers, the elements of the first linked list. Third line contains an integer m, the size of the second linked list. Fourth line contains m integers, the elements of the second linked list.`,
    exampleIn: `1
    \n2
    \n4 3
    \n2
    \n5 6`,
    exampleOut: "7 0 1",
  },
  {
    problemId: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "30%",
    description: `Given a string s, find the length of the longest substring without repeating characters.
      \n Input: A single line containing a string s.`,
    exampleIn: `1
    \nabcabcbb`,
    exampleOut: "3",
  },
  {
    problemId: "4",
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: "40%",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
      \n An input string is valid if:
      \n Open brackets must be closed by the same type of brackets.
      \n Open brackets must be closed in the correct order.
      \n Input: A single line containing a string s.
      \n Output: "true" if the string is valid, "false" otherwise.`,
    exampleIn: `1
    \n([)]`,
    exampleOut: "false",
  },
  {
    problemId: "5",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    acceptance: "30%",
    description: `Given a string s, return the longest palindromic substring in s.
      \n Input: A single line containing a string s.`,
    exampleIn: `1
    \nbabad`,
    exampleOut: "bab",
  },
  {
    problemId: "6",
    title: "Container With Most Water",
    difficulty: "Medium",
    acceptance: "49%",
    description: `Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.
      \n Input: First line contains an integer n, the size of the array. Second line contains n integers, the elements of the array.`,
    exampleIn: `1 
    \n3
    \n1 8 6`,
    exampleOut: "6",
  },
  {
    problemId: "7",
    title: "Reverse Integer",
    difficulty: "Easy",
    acceptance: "26%",
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
      \n Input: A single line containing an integer x.`,
    exampleIn: `1
    \n123`,
    exampleOut: "321",
  },
];

const testcase = {
  // write with no. of testcases
  // like first number it t and then t lines of input
  1: {
    input:
      "5\n4\n2 7 11 15\n9\n3\n3 2 4\n6\n3\n3 3 3\n6\n3\n1 2 3\n4\n3\n1 2 3\n3",
    output: "0 1\n0 2\n0 1\n0 1\n0 1",
  },
  2: {
    input: "2\n2\n4 3\n2\n5 6\n2\n1 2\n2\n3 4",
    output: "7 0 1\n5 6",
  },
  3: {
    input: "3\n7\nabcabcbb\n3\nabc\n3\naaa",
    output: "3\n3\n1",
  },
  4: {
    input: "3\n([)]\n{[()]}\n{[}",
    output: "false\ntrue\nfalse",
  },
  5: {
    input: "5\nbabad\ncbbd\na\nac\nabba",
    output: "bab\ncbb\na\na\nabba",
  },
  6: {
    input: "3\n3\n1 8 6\n3\n1 1 1\n3\n1 2 3\n3\n1 2 1\n3\n1 1 1",
    output: "6\n1\n2\n2\n1",
  },
  7: {
    input: "5\n123\n-123\n120\n478\n15342364",
    output: "321\n-321\n21\n874\n463234351",
  },
};
const SUBMISSIONS = [];

problemsRouter.get("/", (req, res) => {
  res.json({
    msg: "hello world",
  });
});

problemsRouter.get("/problems", (req, res) => {
  const filteredProblems = PROBLEMS.map((x) => ({
    problemId: x.problemId,
    difficulty: x.difficulty,
    acceptance: x.acceptance,
    title: x.title,
  }));

  res.json({
    problems: filteredProblems,
  });
});

problemsRouter.get("/problem/:id", (req, res) => {
  const id = req.params.id;

  const problem = PROBLEMS.find((x) => x.problemId === id);

  if (!problem) {
    return res.status(411).json({});
  }

  res.json({
    problem,
  });
});

problemsRouter.get("/submissions/:problemId", auth, (req, res) => {
  const problemId = req.params.problemId;
  const submissions = SUBMISSIONS.filter(
    (x) => x.problemId === problemId && x.userId === req.userId
  );
  res.json({
    submissions,
  });
});

problemsRouter.post("/submission", auth, async (req, res) => {
  if (!req.body.languageId || !req.body.problemId || !req.body.sourceCode) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const { languageId, sourceCode, problemId } = req.body;

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
      }),
    };

    const response = await axios.request(options);
    return response.data.token;
  };

  const getOutput = async (token) => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "3ed7a75b44mshc9e28568fe0317bp17b5b2jsn6d89943165d8",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    if (response.data.status_id <= 2) {
      return getOutput(token); // Recursive call until status_id is greater than 2
    }
    return response.data;
  };

  const runCode = async () => {
    const language_id = languageId;
    const source_code = Buffer.from(sourceCode).toString("base64");
    const stdin = Buffer.from(testcase[problemId].input).toString("base64");

    const token = await postSubmission(language_id, source_code, stdin);
    const output = await getOutput(token);
    return output;
  };

  try {
    const output = await runCode();

    const stdOutput = output.stdout
      ? Buffer.from(output.stdout, "base64").toString()
      : "";
    const stdError = output.stderr
      ? Buffer.from(output.stderr, "base64").toString()
      : "";
    const status = output.status;

    let outputStr = stdOutput;
    // remove \n from end of string
    if (outputStr[outputStr.length - 1] === "\n") {
      outputStr = outputStr.slice(0, -1);
    }
    if (status.id !== 3) {
      return res.json({
        status: status.description,
      });
    } else if (testcase[problemId].output === outputStr) {
      SUBMISSIONS.push({
        userId: req.userId,
        problemId,
        sourceCode,
        languageId,
        status: "Accepted",
      });
      return res.json({
        status: "Accepted",
      });
    } else {
      return res.json({
        status: "Wrong Answer",
        stdError,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = problemsRouter;
