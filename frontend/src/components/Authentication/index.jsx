import React, { useState, useEffect } from "react";
import './style.scss';
import { BsFacebook } from "react-icons/bs";
import { SiGoogle } from "react-icons/si";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useTranslation } from "react-i18next";
import { SlSocialSteam } from "react-icons/sl";

const LoginForm = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassConf, setRegPassConf] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации

  const { t, i18n: { changeLanguage } } = useTranslation();

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (event.target.className === "modal") {
        setModalVisible(false);
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
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
  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    const lettersPattern = /^[A-Za-zА-Яа-яЁё]*$/;

    if (lettersPattern.test(nameValue) || nameValue === "") {
      setRegName(nameValue);
    } else {
      showAlert("Please enter letters only", "error");
    }
  };
  const registerFn = async (e) => {
    e.preventDefault();

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regName.length > 0 && regPass.length > 0) {
      if (!passwordPattern.test(regPass)) {
        showAlert("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character", "error");
        return;
      }

      if (regPass === regPassConf) {
        try {
          const response = await fetch("http://localhost:3000/users");
          const users = await response.json();
          const existingUser = users.find((user) => user.username === regName);

          if (existingUser) {
            showAlert("User under this username already exists", "error");
            return;
          }

          const newUser = { username: regName, password: regPass };
          await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });

          showAlert("Successfully created an account", "success");
          setRegName("");
          setRegPass("");
          setRegPassConf("");
        } catch (error) {
          console.error("Error registering user:", error);
          showAlert("Error registering user", "error");
        }
      } else {
        showAlert("Passwords do not match", "error");
      }
    } else {
      showAlert("Please, fill in all fields", "error");
    }
  };


  const loginFn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const user = users.find(
        (user) => user.username === loginName && user.password === loginPass
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        showAlert("Successfully logged in", "success");
      } else {
        showAlert("Incorrect credentials provided", "error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showAlert("Error logging in", "error");
    }

    setLoginName("");
    setLoginPass("");
  };

  const logoutFn = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    showAlert("Successfully logged out", "success");
  };

  return (
    <div className="main_div_modal">
      <button className="connect_login" onClick={isLoggedIn ? logoutFn : toggleModal}>
        {isLoggedIn ? "Logout" : t("login.login")}
      </button>

      {isModalVisible && !isLoggedIn && (
        <div className="modal" style={{ display: "flex" }}>
          <div className={`modal-content-modal ${isModalVisible ? "modal-open" : ""}`}>
            <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
              <div className="form-container sign-up-container">
                <form onSubmit={registerFn}>
                  <h1>{t("login.signUp")}</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i><BsFacebook /></i>
                    </a>
                    <a href="#" className="social">
                      <i><SiGoogle /></i>
                    </a>
                    <a href="#" className="social">
                      <i><SlSocialSteam /></i>
                    </a>
                  </div>
                  <span>{t("login.registerDesc")}</span>
                  <input
                    type="text"
                    placeholder={t("login.name")}
                    value={regName}
                    onChange={handleNameChange}
                  />
                  <input
                    type="password"
                    placeholder={t("login.password")}
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder={t("login.passwordConf")}
                    value={regPassConf}
                    onChange={(e) => setRegPassConf(e.target.value)}
                  />
                  <button className="signUpBtn" type="submit">
                    {t("login.register")}
                  </button>
                </form>
              </div>

              <div className="form-container sign-in-container">
                <form onSubmit={loginFn}>
                  <h1>{t("login.signIn")}</h1>
                  <div className="social-container">
                    <a href="#" className="social">
                      <i><BsFacebook /></i>
                    </a>
                    <a href="#" className="social">
                      <i><SiGoogle /></i>
                    </a>
                    <a href="#" className="social">
                      <i><SlSocialSteam /></i>
                    </a>
                  </div>
                  <span>или используйте свой аккаунт</span>
                  <input
                    type="text"
                    placeholder={t("login.name")}
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder={t("login.password")}
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                  <a href="#">{t("login.forgotPass")}</a>
                  <button className="signInBtn" type="submit">
                    {t("login.login")}
                  </button>
                </form>
              </div>

              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <h1>{t("login.loginGreetings")}</h1>
                    <p>{t("login.loginDesc")}</p>
                    <button className="ghost" onClick={handleSignIn}>
                      {t("login.signIn")}
                    </button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <h1>{t("login.registerGreetings")}</h1>
                    <p>{t("login.registerDesc")}</p>
                    <button className="ghost" onClick={handleSignUp}>
                      {t("login.signUp")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
