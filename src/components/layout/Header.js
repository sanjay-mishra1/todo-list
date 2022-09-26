import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import {
  MdAdd,
  MdArrowBack,
  MdClear,
  MdOutlineMenu,
  MdSearch,
} from "react-icons/md";
import PropTypes from "prop-types";
import { AddTask } from "../AddTask";
import { FaRegCalendarAlt } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { logout } from "../../server/auth";
import SearchTask from "../SearchTask";

export const Header = ({
  darkMode,
  setDarkMode,
  user,
  handleMenuBarOpen,
  isMenuBarOpen,
  handleCalendarViewOpen,
  calendarViewOpen,
}) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  let isVisible = useMediaQuery("(max-width: 900px)");
  //console.log(handleMenuBarOpen, handleCalendarViewOpen);
  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          {isVisible && (
            <IconButton
              onClick={() => handleMenuBarOpen()}
              style={{ marginRight: 20, marginLeft: 2, fontSize: 20 }}
            >
              {isMenuBarOpen ? (
                <MdArrowBack color={darkMode ? "#ffffff" : "#000000"} />
              ) : (
                <MdOutlineMenu color={darkMode ? "#ffffff" : "#000000"} />
              )}
            </IconButton>
          )}
          <img src="/images/logo.png" alt="TodoList" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task"
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                <MdAdd
                  style={{
                    color: darkMode ? "#ffffff" : "#000000",
                    fontSize: 23,
                    marginTop: 5,
                  }}
                />
              </button>
            </li>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task"
                type="button"
                onClick={() => {
                  setShowSearchDialog(!showSearchDialog);
                }}
              >
                <MdSearch
                  style={{
                    color: darkMode ? "#ffffff" : "#000000",
                    fontSize: 23,
                    marginTop: 5,
                  }}
                />
              </button>
            </li>
            {/* <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                aria-label="Darkmode on/off"
                type="button"
                onClick={() => setDarkMode(!darkMode)}
              >
                <FaPizzaSlice color={darkMode ? "#ffffff" : "#000000"} />
              </button>
            </li> */}
            {isVisible && (
              <li className="settings__darkmode" style={{ marginLeft: 2 }}>
                <Tooltip title="Open Calendar View" disableInteractive>
                  <IconButton
                    onClick={() => handleCalendarViewOpen()}
                    style={
                      calendarViewOpen
                        ? { background: "#774cff", color: "white" }
                        : null
                    }
                    size="medium"
                  >
                    <FaRegCalendarAlt
                      color={
                        darkMode || calendarViewOpen ? "#ffffff" : "#000000"
                      }
                    />
                  </IconButton>
                </Tooltip>
              </li>
            )}

            <li style={{ marginLeft: 26 }}>
              <div className={"actionBtn"} onClick={logout}>
                {user.name ? (
                  <>
                    <Tooltip title={`${user.name ? user.name : ""} (Logout)`}>
                      {user.image && user.image !== "null" ? (
                        <img
                          className={"profile_image"}
                          src={user.image}
                          alt={user.name ? user.name : ""}
                          width={30}
                          height={30}
                        />
                      ) : (
                        <IconButton className={`profile_image`}>
                          <FaUserAlt />
                        </IconButton>
                      )}
                    </Tooltip>
                  </>
                ) : null}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        uid={user.uid}
        setShowQuickAddTask={setShowQuickAddTask}
      />
      {!showQuickAddTask && (
        <Dialog
          open={showSearchDialog}
          fullWidth
          fullScreen={isVisible}
          onClose={() => setShowSearchDialog(false)}
        >
          <div style={{ paddingRight: "2" }} variant="body2">
            <p style={{ margin: "19px 0px -27px 27px" }}>Search Tasks</p>
            <span>
              <IconButton
                style={{ float: "right" }}
                onClick={() => setShowSearchDialog(false)}
              >
                <MdClear />
              </IconButton>
            </span>
          </div>

          <Divider></Divider>
          <DialogContent>
            <SearchTask uid={user.uid} />
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
