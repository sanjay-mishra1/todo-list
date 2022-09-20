import React, { useEffect, useState } from "react";
import { Checkbox } from "./Checkbox";
import { AddTask } from "./AddTask";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import {
  getTitle,
  getCollatedTitle,
  collatedTasksExist,
  getProjectData,
} from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ListItemButton,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { NoTask } from "./NoTask";
import { screenSizes } from "../util/helper";

export const Tasks = ({ uid }) => {
  const { selectedProject } = useSelectedProjectValue();
  const [viewType, setViewType] = useState("task");
  const { projects } = useProjectsValue();
  const { tasks, archivedTasks } = useTasks(selectedProject, uid);
  const [projectToEdit, setProjectToEdit] = useState(null);
  let small = useMediaQuery(screenSizes.xs);
  //console.log("Task component triggered");
  const handleEditTask = (task) => {
    //console.log(task);
    let project = getProjectData(projects, task.projectId);
    let name;
    //console.log(project);
    if (project) name = project.name;
    setProjectToEdit({ ...task, name });
  };
  let projectName = "";

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: TodoList`;
  });
  //console.log(tasks);
  const getProjectDetail = (projectId) => {
    let project = getProjectData(projects, projectId);
    if (!project) return <></>;
    else
      return (
        <>
          <span>{project.name}</span>
          <div
            className="sidebar__dot"
            style={{ backgroundColor: project.color }}
          ></div>
        </>
      );
  };
  const getTaskView = (tasks) => {
    // console.log(tasks);
    return (
      <>
        {" "}
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <ListItemButton style={{ padding: 0, borderRadius: 11 }}>
              <Paper
                onClick={() => handleEditTask(task)}
                style={{ width: "100%", padding: 9, borderRadius: 11 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    <Checkbox id={task.id} taskDesc={task.task} />
                    <Divider
                      className="mui-divider-custom"
                      orientation="vertical"
                    />
                  </div>
                  <div style={{ width: "78vh" }}>
                    <div>
                      {task.task.split("\n").map((text, index) => {
                        return (
                          <span key={text + index}>
                            <span>{text}</span>
                            {task.task.split("\n").length - 1 !== index && (
                              <br />
                            )}
                          </span>
                        );
                      })}
                    </div>
                    <div className="project-detail-container">
                      {getProjectDetail(task.projectId)}
                    </div>
                  </div>
                </div>
              </Paper>
            </ListItemButton>
          </li>
        ))}
        {(!tasks || !tasks.length) && (
          <NoTask selectedProject={selectedProject} />
        )}
      </>
    );
  };
  return (
    <>
      <div className="tasks left-task" data-testid="tasks">
        {/* <h2 data-testid="project-name">{projectName}</h2> */}
        <TaskHeader
          projectName={projectName}
          setViewType={setViewType}
          viewType={viewType}
        />
        <div
          style={{
            overflow: "auto",
            height: "109%",
            paddingBottom: 25,
          }}
        >
          <ul className="tasks__list">
            {viewType === "task"
              ? getTaskView(tasks)
              : getTaskView(archivedTasks)}
          </ul>
          <AddTask uid={uid} />
          <br />
        </div>
      </div>

      {projectToEdit && (
        <Dialog
          open={true}
          onClose={() => setProjectToEdit(null)}
          style={{ width: "100%", height: "100%" }}
          fullScreen={small}
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
    </>
  );
};

const TaskHeader = ({ setViewType, viewType, projectName, isTaskFound }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          size="small"
          onClick={() => {
            setViewType("task");
          }}
          variant={viewType === "task" ? "contained" : "outlined"}
          style={{
            textTransform: "capitalize",
            borderRadius: "10",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          Pending
        </Button>
        <h2 style={{ color: "#2727279e" }} data-testid="project-name">
          {projectName}
        </h2>

        <Button
          size="small"
          onClick={() => {
            setViewType("archived");
          }}
          variant={viewType === "archived" ? "contained" : "outlined"}
          style={{
            textTransform: "capitalize",
            borderRadius: "10",
            marginRight: 10,
          }}
        >
          Completed
        </Button>
      </div>
      <br />
      <br />
    </>
  );
};
