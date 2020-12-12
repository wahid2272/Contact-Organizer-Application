import { React, useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (res) => {
        setContent(res.data);
      },
      (err) => {
        const _content =
          (err.res && err.res.data) || err.message || err.toSring();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
