import React, { useState } from "react";
import { connect } from "react-redux";
import { getSession } from "../server/auth";
import { getProjectList } from "../store/actioncreator";
import { Header } from "../components/layout/Header";
import { Content } from "../components/layout/Content";
import {
  ProjectsProvider,
  SelectedProjectProvider,
  useProjectsValue,
} from "../context";
function Home(props) {
  const [user, setUser] = useState();
  const [openMenuBar, setOpenMenuBar] = useState(false);
  const [openCalendarView, setOpenCalendarView] = useState(false);
  if (!user) getSession(setUser, true);
  else {
    //console.log("getting projects ", props);
    if (!props.projectList) props.getProjectList();
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
  //console.log("loading ui", props);
  return (
    <React.Fragment>
      {user ? (
        <SelectedProjectProvider>
          <ProjectsProvider>
            <main
              data-testid="application"
              className={darkMode ? "darkmode" : undefined}
            >
              <Header
                user={user}
                handleMenuBarOpen={handleMenuBarOpen}
                calendarViewOpen={openCalendarView}
                handleCalendarViewOpen={handleCalendarViewOpen}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
              <br />
              <br />
              <br />
              <br />
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
