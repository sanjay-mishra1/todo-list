import { Button } from "@mui/material";
import React, { Component } from "react";
import { login, signUp } from "../../server/auth";
import { MdPostAdd } from "react-icons/md";
import { homePageData } from "../../constants";
export default class DefaultHome extends Component {
  render() {
    return (
      <>
        <header style={{ height: 57 }} className="header" data-testid="header">
          <nav style={{ height: 57 }}>
            <div
              className="logo"
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* <img src="/images/logo.png" alt="TodoList" /> */}
            </div>
            <div className="settings">
              <ul>
                <li style={{ width: "fit-content", marginRight: 15 }}>
                  <Button
                    LinkComponent="a"
                    href={login(true)}
                    style={{ textTransform: "capitalize", fontSize: 18 }}
                    variant="text"
                  >
                    Login
                  </Button>
                </li>
                <li style={{ width: "fit-content" }}>
                  <Button
                    LinkComponent="a"
                    href={signUp(true)}
                    style={{ textTransform: "capitalize", fontSize: 18 }}
                    variant="contained"
                  >
                    Start for free
                  </Button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <section className="home-main">
          <div className="home-left">
            <img src="/images/task-male.svg" alt="Task Male" />
          </div>
          <div className="home-center">
            <img src="/images/logo.png" alt="TodoList" />
            <h1>TodoList</h1>

            <p className="description">
              {/* <span>To Do gives you focus, from work to play.</span> */}
              <span>Become focused, organized, and calm with TodoList.</span>
            </p>
            {/* <p>Become focused, organized, and calm with TodoList</p> */}
            <div className="interaction-signin">
              <Button
                href={login(true)}
                LinkComponent="a"
                variant="contained"
                color="primary"
              >
                Get started
              </Button>
            </div>
          </div>
        </section>
        <section className="home-data">
          <div className="home-data-section">
            {homePageData.map((item, index) => (
              <Item
                key={index}
                text={item.title}
                icon={<img src={item.icon} alt="add-task" />}
              />
            ))}
          </div>
          <br />
          <br />
          <br />
        </section>
      </>
    );
  }
}
const Item = ({ text, icon }) => {
  return (
    <div className="home-data-item">
      <div className="home-item-background"></div>
      <div>{icon}</div>
      <small>{text}</small>
    </div>
  );
};
