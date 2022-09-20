import React from "react";
import { Sidebar } from "./Sidebar";
import { Tasks } from "../Tasks";
import { useProjectsValue } from "../../context";
import RightSidebar from "../RightSidebar";
import { MdDoneAll } from "react-icons/md";
import {
  BiChevronLeft,
  BiChevronRight,
  BiLeftArrow,
  BiRightArrow,
} from "react-icons/bi";
import styled from "@emotion/styled";
import MuiAppBar from "@mui/material/AppBar";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import {
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
} from "@mui/material";

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
  return (
    <section style={{ right: 0, paddingTop: "19em" }} className="content">
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
