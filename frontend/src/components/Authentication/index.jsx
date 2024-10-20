import React, { useState, useEffect } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import './style.scss'

const LoginForm = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassConf, setRegPassConf] = useState("");

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (event.target.className === "modal") {
        setModalVisible(false);
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSignUp = () => {
    setRightPanelActive(true);
  };

  const handleSignIn = () => {
    setRightPanelActive(false);
  };

  const showAlert = (msg, type) => {
    let background = "";
    if (type === "success") {
      background = "linear-gradient(to right, #00b09b, #96c93d)";
    } else if (type === "error") {
      background = "linear-gradient(to right, orange, orangered)";
    }

    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      style: { background },
    }).showToast();
  };

  const getUsersFromLS = () => {
    const allUsers = localStorage.getItem("users") || "[]";
    return JSON.parse(allUsers);
  };

  const loginFn = (e) => {
    e.preventDefault();
    const users = getUsersFromLS();

    const bool = users.find(
      (user) => user.username === loginName && user.password === loginPass
    );

    if (bool) {
      showAlert("Successfully logged in", "success");
    } else {
      showAlert("Incorrect credentials provided", "error");
    }
    setLoginName("");
    setLoginPass("");
  };

  const registerFn = (e) => {
    e.preventDefault();

    if (regName.length > 0 && regPass.length > 0) {
      if (regPass === regPassConf) {
        const allUsers = getUsersFromLS();
        const names = allUsers.map((user) => user.username);

        if (names.includes(regName)) {
          showAlert("User under this username already exists", "error");
          return;
        }

        const newUser = { username: regName, password: regPass };
        allUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(allUsers));

        showAlert("Successfully created an account", "success");
        setRegName("");
        setRegPass("");
        setRegPassConf("");
      } else {
        showAlert("Passwords do not match", "error");
      }
    } else {
      showAlert("Please, fill in all fields", "error");
    }
  };

  return (
    <div className="main_div_modal">
      <button className="connect_login" onClick={toggleModal}>
        Login
      </button>

      {isModalVisible && (
        <div className="modal" style={{ display: "flex" }}>
          <div className={`modal-content-modal ${isModalVisible ? "modal-open" : ""}`}>
            <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
              <div className="form-container sign-up-container">
                <form onSubmit={registerFn}>
                  <h1>Регистрация</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <span>или используйте свой эл. адрес для регистрации</span>
                  <input
                    type="text"
                    placeholder="Name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Pass-Conf"
                    value={regPassConf}
                    onChange={(e) => setRegPassConf(e.target.value)}
                  />
                  <button className="signUpBtn" type="submit">
                    Зарегистрироваться
                  </button>
                </form>
              </div>

              <div className="form-container sign-in-container">
                <form onSubmit={loginFn}>
                  <h1>Войти</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                  <span>или используйте свой аккаунт</span>
                  <input
                    type="text"
                    placeholder="Name"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                  <a href="#">Забыли пароль?</a>
                  <button className="signInBtn" type="submit">
                    Войти
                  </button>
                </form>
              </div>

              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left" id="overlat_right">
                    <h1>Добро пожаловать обратно!</h1>
                    <p>Чтобы оставаться на связи с нами, пожалуйста, войдите под своей личной информацией</p>
                    <button className="ghost" onClick={handleSignIn}>
                      Войти
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right" id="overlat_left">
                    <h1>Привет, Друг!</h1>
                    <p>Введите свои личные данные и начните путешествие с нами</p>
                    <button className="ghost" onClick={handleSignUp}>
                      Регистрация
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <span className="close-btn" onClick={toggleModal}>
              &times;
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
