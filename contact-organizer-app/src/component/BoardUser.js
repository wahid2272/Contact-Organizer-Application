import React, { useEffect } from "react";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (res) => {
        setContent(res.data);
      },
      (err) => {
        const _content =
          (err.res && err.res.data && err.res.message) ||
          err.message ||
          err.toString();

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

export default BoardUser;
