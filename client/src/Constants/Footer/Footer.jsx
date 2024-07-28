import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div id="footer">
      <div className="footer-main flex-row">
        <div className="footer-logo">
          <p onClick={() => window.scrollTo(0, 0)}>MeetCode</p>
          <p>© 2023 All rights reserved</p>
        </div>
        <div className="footer-options">
          <a href="https://github.com/devesh-dkp/meetcode">Github</a>
          <a href="https://www.linkedin.com/in/deveshkpandey/">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
