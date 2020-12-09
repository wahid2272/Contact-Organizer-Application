const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  } else {
    return null;
  }
};

const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export default { getUser, getToken, removeUserSession, setUserSession };
