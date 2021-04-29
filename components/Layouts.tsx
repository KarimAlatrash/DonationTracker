import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
        
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      body {
        margin: 0;
        padding: 0 2rem;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: rgba(0, 0, 0, 0.05);
        background-color: rgba(17, 31, 154, 1);
        color: #ffffff;
        
      }
      input,
      textarea {
        font-size: 16px;
      }
      button {
        cursor: pointer;
      }
    `}</style>
    
  </div>
);

export default Layout;