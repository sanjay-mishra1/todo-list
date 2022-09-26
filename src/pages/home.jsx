import React, { useState } from "react";
import { connect } from "react-redux";
import { getSession } from "../server/auth";
import { getProjectList } from "../store/actioncreator";
import { Header } from "../components/layout/Header";
import { Content } from "../components/layout/Content";
import { ProjectsProvider, SelectedProjectProvider } from "../context";
import DefaultHome from "../components/DefaultHome/DefaultHome";
function Home(props) {
  const [user, setUser] = useState();
  const [openMenuBar, setOpenMenuBar] = useState(false);
  const [openCalendarView, setOpenCalendarView] = useState(false);
  const [showView, setShowView] = useState(null);
  if (!user) getSession(setUser, false);
  else {
    // console.log("received user ", user);
    if (!showView) {
      if (!user.uid) setShowView("default");
      else {
        setShowView("task");
        if (!props.projectList) props.getProjectList();
      }
    }
  }

  const [darkMode, setDarkMode] = useState(props.darkModeDefault);
  const handleMenuBarOpen = () => {
    setOpenMenuBar(!openMenuBar);
    setOpenCalendarView(false);
  };
  const handleCalendarViewOpen = () => {
    setOpenCalendarView(!openCalendarView);
    setOpenMenuBar(false);
  };
  return (
    <React.Fragment>
      {user ? (
        showView === "task" ? (
          <>
            <SelectedProjectProvider>
              <ProjectsProvider>
                <main
                  data-testid="application"
                  style={{ display: "flex", flexDirection: "column" }}
                  className={darkMode ? "darkmode" : undefined}
                >
                  <Header
                    isMenuBarOpen={openMenuBar}
                    user={user}
                    handleMenuBarOpen={handleMenuBarOpen}
                    calendarViewOpen={openCalendarView}
                    handleCalendarViewOpen={handleCalendarViewOpen}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />

                  <Content
                    openMenuBar={openMenuBar}
                    handleMenuBarOpen={handleMenuBarOpen}
                    openCalendarView={openCalendarView}
                    setOpenCalendarView={handleCalendarViewOpen}
                    user={user}
                    projectList={props.projectList}
                  />
                </main>
              </ProjectsProvider>
            </SelectedProjectProvider>
          </>
        ) : (
          <DefaultHome />
        )
      ) : null}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    projectList: state.data.projectList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectList: () => dispatch(getProjectList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
