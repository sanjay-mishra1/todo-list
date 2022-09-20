import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemButton,
  Paper,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import React, { useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useTasks } from "../hooks";
import { useProjectsValue } from "../context";
import { getProjectData } from "../helpers";
import { AddTask } from "./AddTask";
import {
  pickTextColorBasedOnBgColorAdvanced,
  screenSizes,
} from "../util/helper";
import { MdDoneAll } from "react-icons/md";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { NoTask } from "./NoTask";

export default function RightSidebar({
  uid,
  openCalendarView,
  setOpenCalendarView,
}) {
  const [viewType, setViewType] = useState("day");
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));
  const { projects } = useProjectsValue();
  let small = useMediaQuery("(max-width: 900px)");

  return (
    <div
      style={
        openCalendarView
          ? {
              right: 0,
              width: "100%",
              display: "block",
              zIndex: 1,
              paddingTop: 20,
            }
          : { right: 0, width: 320 }
      }
      className="sidebar"
      data-testid="sidebar"
    >
      {small && (
        <>
          <br />
          <br />
          <br />
        </>
      )}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          fullWidth
          size="small"
          onClick={() => {
            setViewType("day");
          }}
          variant={viewType === "day" ? "contained" : "outlined"}
          style={{
            textTransform: "capitalize",
            borderRadius: "10",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          Day
        </Button>
        <Button
          fullWidth
          size="small"
          onClick={() => {
            setViewType("month");
          }}
          variant={viewType === "month" ? "contained" : "outlined"}
          style={{
            textTransform: "capitalize",
            borderRadius: "10",
            marginRight: 10,
          }}
        >
          month
        </Button>
      </div>
      <div style={{ height: "100%", overflow: "auto" }}>
        {viewType === "day" ? (
          <DateView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        ) : (
          <CalendarView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        <AllTasks
          small={small}
          uid={uid}
          date={selectedDate}
          projects={projects}
        />
      </div>
    </div>
  );
}

const CalendarView = ({ selectedDate, setSelectedDate }) => {
  const [value, setValue] = React.useState(moment(selectedDate));

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setSelectedDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

const DateView = ({ selectedDate, setSelectedDate }) => {
  const handleArrowClick = (isNext) => {
    setSelectedDate(moment(selectedDate).add(isNext ? 1 : -1, "day"));
  };
  return (
    <>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          style={{
            borderRadius: 10,
            border: "1px solid #bab9b9",
            padding: 3,
            marginLeft: 10,
          }}
          onClick={() => handleArrowClick(false)}
        >
          <BiChevronLeft />
        </IconButton>
        <b>{moment(selectedDate).format("ddd, MMM DD")}</b>
        <IconButton
          style={{
            borderRadius: 10,
            border: "1px solid #bab9b9",
            padding: 3,
            marginRight: 10,
          }}
          onClick={() => handleArrowClick(true)}
        >
          <BiChevronRight />
        </IconButton>
      </div>
    </>
  );
};

const AllTasks = ({ uid, date, projects, small }) => {
  const [projectToEdit, setProjectToEdit] = useState(null);

  //console.log("Task component triggered");
  const handleEditTask = (task) => {
    //console.log(task);
    let project = getProjectData(projects, task.projectId);
    let name;
    //console.log(project);
    if (project) name = project.name;
    setProjectToEdit({ ...task, name });
  };
  const getProjectDetail = (projectId) => {
    let project = getProjectData(projects, projectId);
    //console.log(project);
    return project && project.color ? project.color : "#ffffff";
  };

  const { tasks, archivedTasks } = useTasks(
    "",
    uid,
    moment(date).format("DD/MM/YYYY")
  );
  const getTaskHtml = (task) => {
    let color = getProjectDetail(task.projectId);
    return (
      <ListItemButton style={{ padding: 0, borderRadius: 11 }}>
        <Paper
          onClick={() => handleEditTask(task)}
          style={{
            width: "100%",
            padding: 9,
            borderRadius: 11,
            background: color,
            color: pickTextColorBasedOnBgColorAdvanced(color),
          }}
        >
          <div style={{ display: "flex", padding: 3 }}>
            <div style={small ? { width: "100%" } : { width: "78vh" }}>
              <div>
                {task.task}{" "}
                {task.archived && (
                  <span style={{ float: "right" }}>
                    <Tooltip title="Task completed" disableInteractive>
                      <span>
                        <MdDoneAll
                          color={pickTextColorBasedOnBgColorAdvanced(
                            color,
                            "#ffffff",
                            "green"
                          )}
                        />
                      </span>
                    </Tooltip>
                  </span>
                )}
              </div>
            </div>
          </div>
        </Paper>
      </ListItemButton>
    );
  };
  //console.log(tasks, archivedTasks);
  return (
    <div
      className="tasks right-task"
      style={{
        marginLeft: 10,
        width: "auto",
        marginTop: 10,
        background: "#f1f4fa",
        borderRadius: 10,
        marginRight: 10,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 10,
        position: "initial",
        // height: "auto",
      }}
      data-testid="tasks"
    >
      <ul className="tasks__list" style={{ paddingBottom: 21 }}>
        {tasks.map((task) => (
          <li
            key={`${task.id}`}
            style={{ padding: "2px 0 2px 4px", marginBottom: 10 }}
          >
            {getTaskHtml(task)}
          </li>
        ))}
        {archivedTasks.map((task) => (
          <li
            key={`${task.id}`}
            style={{ padding: "2px 0 2px 4px", marginBottom: 10 }}
          >
            {getTaskHtml(task)}
          </li>
        ))}
        {(!tasks || (!tasks.length && !archivedTasks.length)) && <NoTask />}
      </ul>

      {projectToEdit && (
        <Dialog
          fullScreen={small}
          open={true}
          onClose={() => setProjectToEdit(null)}
          style={{ width: "100%", height: "100%" }}
        >
          <DialogTitle>Update Task</DialogTitle>
          <Divider />
          <DialogContent>
            <div style={!small ? { height: "70vh", width: "70vh" } : null}>
              <AddTask
                defaultTask={projectToEdit}
                uid={uid}
                showAddTaskMain={false}
                hideParentBox={() => setProjectToEdit(null)}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
