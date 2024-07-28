const posts = [
  {
    date: "July 20, 2023",
    title: "How to host a website on Google Cloud",
    content: `
  First, you need to create a project on Google Cloud Platform. Then, you need to create a virtual machine instance and install a web server on it. After that, you need to upload your website files to the virtual machine instance. Finally, you need to configure the web server to serve your website files.

  ![VM instance on Google Cloud Platform](https://cloudacademy.com/_next/hanami/image/?url=https%3A%2F%2Fassets.cloudacademy.com%2Fbakery%2Fmedia%2Fuploads%2Flaboratories%2Fenvironment_end_images%2FAfter_ZWxDp4d.png&w=3840&q=75)

  **To create a project on Google Cloud Platform:**

  - Go to the Google Cloud Platform Console.
  - Click on the "Select a project" dropdown menu at the top of the page.
  - Click on the "New Project" button.
  - Enter a name for your project and click on the "Create" button.

  **To create a virtual machine instance on Google Cloud Platform:**

  - Go to the Google Cloud Platform Console.
  - Click on the "Navigation menu" button at the top of the page.
  - Click on the "Compute Engine" menu item.
  - Click on the "VM instances" menu item.
  - Click on the "Create" button.
  - Enter a name for your virtual machine instance.
  - Select a region and zone for your virtual machine instance.
  - Select a machine type for your virtual machine instance.
  - Click on the "Create" button.

  **To install a web server on your virtual machine instance:**

  - Connect to your virtual machine instance using SSH.
  - Install a web server on your virtual machine instance.
  - Configure the web server to serve your website files.

  **To upload your website files to your virtual machine instance:**

  - Connect to your virtual machine instance using SSH.
  - Upload your website files to your virtual machine instance.

  **To configure the web server to serve your website files:**

  - Connect to your virtual machine instance using SSH.
  - Configure the web server to serve your website files.

  That's it! Your website should now be hosted on Google Cloud Platform.
      `,
  },
  {
    date: "July 21, 2023",
    title: "How to connect MySQL database to Website on Google Cloud",
    content: `
  First, you need to create a MySQL database on Google Cloud Platform. Then, you need to create a user and grant permissions to the user to access the database. After that, you need to configure your website to connect to the MySQL database. Finally, you need to test the connection to the MySQL database.

  **To create a MySQL database on Google Cloud Platform:**

  - Go to the Google Cloud Platform Console.
  - Click on the "Navigation menu" button at the top of the page.
  - Click on the "SQL" menu item.
  - Click on the "Create instance" button.
  - Enter a name for your database instance.
  - Select a region and zone for your database instance.
  - Select a machine type and storage capacity for your database instance.
  - Click on the "Create" button.

  ![MySQL database on Google Cloud Platform](https://cdn.qwiklabs.com/bSUBaAB9WIEzVbyTUd%2F%2F8L4xlh7Tb2z4y1z7ZiKKu2Y%3D)

  **To create a user and grant permissions to the user to access the database:**

  - Go to the Google Cloud Platform Console.
  - Click on the "Navigation menu" button at the top of the page.
  - Click on the "SQL" menu item.
  - Click on the name of your database instance.
  - Click on the "Users" tab.
  - Click on the "Create user account" button.
  - Enter a name for the user and a password.
  - Click on the "Create" button.
  - Click on the "Add user account" button.
  - Enter the user's email address.
  - Click on the "Add" button.

  **To configure your website to connect to the MySQL database:**

  - Connect to your virtual machine instance using SSH.
  - Install the MySQL client on your virtual machine instance.
  - Configure your website to connect to the MySQL database.

  **To test the connection to the MySQL database:**

  - Connect to your virtual machine instance using SSH.
  - Use the MySQL client to connect to the MySQL database.
  - Run a query to test the connection to the MySQL database.

  That's it! Your website should now be connected to the MySQL database on Google Cloud Platform.
      `,
  },

  {
    date: "July 22, 2023",
    title: "How to use trie data structure in C++",
    content: `
  A trie is a tree-like data structure that is used to store a dynamic set of strings. It is commonly used in text processing applications like autocomplete and spell checking. A trie is also known as a prefix tree because it stores strings by their prefixes.
  
![Trie data structure](https://upload.wikimedia.org/wikipedia/commons/b/be/Trie_example.svg)

**To implement a trie data structure in C++:**
\`\`\`cpp
        class TrieNode {
        public:
            TrieNode* children[26];
            bool isEndOfWord;
            
            TrieNode() {
                for (int i = 0; i < 26; i++) {
                    children[i] = nullptr;
                }
                isEndOfWord = false;
            }
        };

        class Trie {
        public:
            TrieNode* root;
            
            Trie() {
                root = new TrieNode();
            }
            
            void insert(string word) {
                TrieNode* node = root;
                for (char c : word) {
                    int index = c - 'a';
                    if (node->children[index] == nullptr) {
                        node->children[index] = new TrieNode();
                    }
                    node = node->children[index];
                }
                node->isEndOfWord = true;
            }
            
            bool search(string word) {
                TrieNode* node = root;
                for (char c : word) {
                    int index = c - 'a';
                    if (node->children[index] == nullptr) {
                        return false;
                    }
                    node = node->children[index];
                }
                return node->isEndOfWord;
            }
        };
\`\`\`

  **To use the trie data structure in C++:**

  - Create a Trie object.
  - Insert strings into the trie using the insert() method.
  - Search for strings in the trie using the search() method.

  \`\`\`cpp
  Trie trie;
  trie.insert("apple");
  trie.insert("banana");
  cout << trie.search("apple") << endl; // Output: 1
  cout << trie.search("orange") << endl; // Output: 0
  \`\`\`

  That's it! You have successfully implemented and used a trie data structure in C++.

      `,
  },

  {
    date: "July 23, 2023",
    title: "How to use React Context API",
    content: `

  The React Context API is a way to pass data through the component tree without having to pass props down manually at every level. It is designed to share data that can be considered "global" for a tree of React components, such as the current authenticated user, theme, or preferred language.

  **To create a context in React:**
  \`\`\`jsx
  import React from 'react';

  const MyContext = React.createContext();

  export default MyContext;
  \`\`\`

  **To provide a context value in React:**
  \`\`\`jsx
  import React from 'react';
  import MyContext from './MyContext';

  const MyProvider = ({ children }) => {
    const value = 'Hello, world!';

    return (
      <MyContext.Provider value={value}>
        {children}
      </MyContext.Provider>
    );
  }

  export default MyProvider;
  \`\`\`

  **To consume a context value in React:**
  \`\`\`jsx
  import React, { useContext } from 'react';
  import MyContext from './MyContext';

  const MyComponent = () => {
    const value = useContext(MyContext);

    return <div>{value}</div>;
  }

  export default MyComponent;
  \`\`\`

  **To use the context provider in your app:**
  \`\`\`jsx
  import React from 'react';
  import MyProvider from './MyProvider';
  import MyComponent from './MyComponent';

  const App = () => {
    return (
      <MyProvider>
        <MyComponent />
      </MyProvider>
    );
  }

  export default App;
  \`\`\`

  That's it! You have successfully used the React Context API to share data between components in a React app.
      `,
  },
  {
    date: "July 24, 2023",
    title: "How to use Redux in React",
    content: `
  Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. Redux can be used with any UI layer and any framework, including React.

  **To install Redux in a React app:**
  \`\`\`bash
  npm install redux react-redux
  \`\`\`

  **To create a Redux store in a React app:**
  \`\`\`jsx
  import { createStore } from 'redux';
  import rootReducer from './reducers';

  const store = createStore(rootReducer);
  \`\`\`

  **To create a Redux reducer in a React app:**
  \`\`\`jsx
  const initialState = {
    count: 0,
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  };

  export default rootReducer;
  \`\`\`

  **To connect a React component to the Redux store:**
  \`\`\`jsx
  import React from 'react';
  import { connect } from 'react-redux';

  const Counter = ({ count, increment, decrement }) => (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );

  const mapStateToProps = (state) => ({
    count: state.count,
  });

  const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Counter);
  \`\`\`

  **To use the connected component in your app:**
  \`\`\`jsx
  import React from 'react';
  import { Provider } from 'react-redux';
  import store from './store';
  import Counter from './Counter';

  const App = () => (
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  export default App;
  \`\`\`

  That's it! You have successfully used Redux in a React app to manage the state of your application.
      `,
  },
];

export default posts;
