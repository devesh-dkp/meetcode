import React, { useState } from "react";
import "./HomePage.css";
import loremContent from "./LoremPosts";
import Footer from "../../Constants/Footer/Footer";

const HomePage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogClick = (index) => {
    setSelectedBlog(index);
  };

  const handleCloseBlog = () => {
    setSelectedBlog(null);
  };

  return (
    <div id="home">
      <h1 className="flex-row">Blogs</h1>
      <div className="blog-container">
        {loremContent.map((content, index) => (
          <div
            key={`blog-${index}`}
            className="blog-box"
            onClick={() => handleBlogClick(index)}
          >
            <p className="date">{content.date}</p>
            <h4 className="title">{content.title}</h4>
            <p className="content">{content.content}</p>
          </div>
        ))}
      </div>
      {selectedBlog !== null && (
        <div className="overlay" onClick={handleCloseBlog}>
          <div className="zoomed-blog">
            <p className="date">{loremContent[selectedBlog].date}</p>
            <h4 className="title">{loremContent[selectedBlog].title}</h4>
            <p className="content">{loremContent[selectedBlog].content}</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
