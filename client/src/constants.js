export const backendUrl = "http://localhost:3000/api";

export const LANGUAGE_VERSIONS = {
  cpp: "GCC 9.2.0",
  javascript: "Node.js 18.15.0",
  python: "3.11.2",
  java: "JDK 17.0.6",
};

export const LANGAUGE_IDS = {
  cpp: 54,
  javascript: 93,
  python: 92,
  java: 91,
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  cpp: `\n#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
};