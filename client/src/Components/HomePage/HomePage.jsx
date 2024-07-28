import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./HomePage.css";
import posts from "./Posts";
import Footer from "../../Constants/Footer/Footer";

const HomePage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogClick = (index) => {
    setSelectedBlog(index);
  };

  const handleCloseBlog = (e) => {
    if (e.target.classList.contains("overlay")) {
      setSelectedBlog(null);
    }
  };

  return (
    <>
      <div id="home">
        <div className="blog-container">
          {posts.map((content, index) => (
            <div
              key={`blog-${index}`}
              className="blog-box"
              onClick={() => handleBlogClick(index)}
            >
              <p className="date">{content.date}</p>
              <h4 className="title">{content.title}</h4>
              <p className="content">{content.content.slice(0, 200)}...</p>
            </div>
          ))}
        </div>
        {selectedBlog !== null && (
          <div className="overlay" onClick={handleCloseBlog}>
            <div className="zoomed-blog">
              <p className="date">{posts[selectedBlog].date}</p>
              <h1 className="title">{posts[selectedBlog].title}</h1>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="react-markdown"
              >
                {posts[selectedBlog].content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;