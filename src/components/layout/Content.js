import React from "react";
import { Sidebar } from "./Sidebar";
import { Tasks } from "../Tasks";
import { useProjectsValue } from "../../context";
import RightSidebar from "../RightSidebar";
import { useMediaQuery } from "@mui/material";

export const Content = ({
  user,
  projectList,
  openMenuBar,
  handleMenuBarOpen,
  openCalendarView,
  setOpenCalendarView,
}) => {
  const { setProjects } = useProjectsValue();

  React.useEffect(() => {
    setProjects(projectList);
  }, [projectList]);
  let small = useMediaQuery("(max-width: 930px)");
  return (
    <section style={small ? { paddingTop: "3em" } : null} className="content">
      <Sidebar
        uid={user.uid}
        openMenubar={openMenuBar}
        handleMenubar={handleMenuBarOpen}
      />
      <Tasks uid={user.uid} />
      <RightSidebar
        uid={user.uid}
        openCalendarView={openCalendarView}
        setOpenCalendarView={setOpenCalendarView}
      />
    </section>
  );
};
