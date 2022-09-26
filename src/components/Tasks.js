import React, { useEffect, useState } from "react";
import { Checkbox } from "./Checkbox";
import { AddTask } from "./AddTask";
import { useTasks, useTodaysCompletedData } from "../hooks";
import { collatedTasks, ViewType } from "../constants";
import {
  getTitle,
  getCollatedTitle,
  collatedTasksExist,
  getProjectData,
} from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ListItemButton,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NoTask } from "./NoTask";
import { getViewTypeName, groupData, screenSizes } from "../util/helper";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TaskViewTypeOverlay } from "./TaskViewTypeOverlay";
export const Tasks = ({ uid }) => {
  const { selectedProject } = useSelectedProjectValue();
  const [viewType, setViewType] = useState("task");
  const { projects } = useProjectsValue();
  const { tasks, archivedTasks } = useTasks(selectedProject, uid);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [groupType, setGroupType] = useState(ViewType[0].key);
  const [showGroupTypeOverlay, setShowGroupTypeOverlay] = useState(null);
  let small = useMediaQuery(screenSizes.xs);
  const { completedTask } = useTodaysCompletedData(uid, selectedProject);
  // console.log("completedTask", completedTask);
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
    projectName = getTitle(projects, selectedProject)?.name ?? selectedProject;
  }

  useEffect(() => {
    document.title = `${projectName}: TodoList`;
  });
  //console.log(tasks);

  const getTaskView = (tasks, isCompleted) => {
    let results;
    if (groupType !== "none") {
      if (isCompleted) {
        let tempTask = JSON.parse(JSON.stringify(tasks));
        archivedTasks.forEach((item) => {
          if (!tasks.find((doc) => doc.id === item.id)) tempTask.push(item);
        });

        tasks = tempTask;
      }

      // console.log("task view", tasks, archivedTasks);
      //filter task by project
      results = groupData(tasks, groupType);

      results = Object.keys(results)
        .sort()
        .reverse()
        .reduce(function (result, key) {
          result[key] = results[key];
          return result;
        }, {});
    } else {
      results = {};
      if (isCompleted) {
        let tempTask = JSON.parse(JSON.stringify(tasks));
        archivedTasks.forEach((item) => {
          if (!tasks.find((doc) => doc.id === item.id)) tempTask.push(item);
        });

        tasks = tempTask;
      }
      results[""] = { ...tasks };
    }

    // console.log("results", results);
    return (
      <>
        {Object.keys(results).length > 1 ? (
          Object.keys(results).map((projectId) => {
            let project = getProjectData(projects, projectId);
            return (
              <Accordion
                defaultExpanded={true}
                key={projectId}
                style={{ backgroundColor: "transparent", boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<MdKeyboardArrowDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="task-expand-text"
                >
                  <Typography>{project?.name ?? projectId}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TaskView
                    defaultProjectDetail={project}
                    handleEditTask={handleEditTask}
                    projects={projects}
                    tasks={results[projectId]}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <TaskView
            handleEditTask={handleEditTask}
            projects={projects}
            tasks={tasks}
          />
        )}

        {(!tasks || !tasks.length) && (
          <NoTask
            isCompletedTaskView={viewType !== "task"}
            selectedProject={selectedProject}
          />
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
          isArchived={archivedTasks.length > 0 || completedTask.length > 0}
          isPending={tasks.length > 0}
          selectedProject={selectedProject}
        />

        <TaskViewTypeOverlay
          setShowViewTypeOverlay={setShowGroupTypeOverlay}
          setViewTypeName={setGroupType}
          showViewTypeOverlay={showGroupTypeOverlay}
        />
        <br />
        <div
          style={{
            overflow: "auto",
            height: "109%",
            paddingBottom: 25,
          }}
        >
          {(viewType === "task"
            ? tasks.length > 0
            : archivedTasks.length > 0) && (
            <>
              <Button
                variant="outlined"
                style={{
                  color: "inherit",
                  textTransform: "capitalize",
                  display: "flex",
                  cursor: "pointer",
                  width: "fit-content",
                  padding: "3px 7px 3px 9px",
                  borderRadius: 12,
                  alignItems: "center",
                  marginLeft: "auto",
                }}
                onClick={(e) => setShowGroupTypeOverlay(e.currentTarget)}
              >
                <p>{getViewTypeName(groupType)}</p>
                <img
                  style={{ marginLeft: 6 }}
                  src="/images/filter.svg"
                  alt="filter view"
                />
              </Button>
            </>
          )}
          <ul className="tasks__list">
            {viewType === "task"
              ? getTaskView(tasks)
              : selectedProject === "TODAY"
              ? getTaskView(completedTask, true)
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

const TaskHeader = ({
  setViewType,
  viewType,
  projectName,
  isArchived,
  isPending,
  selectedProject,
}) => {
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
          disabled={!isPending && selectedProject === "PREVIOUS"}
          variant={viewType === "task" ? "contained" : "outlined"}
          style={{
            textTransform: "capitalize",
            borderRadius: "10",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <span
            onClick={() => {
              setViewType("task");
            }}
          >
            Pending
          </span>
        </Button>
        <h2 style={{ color: "#2727279e" }} data-testid="project-name">
          {projectName}
        </h2>

        <Button
          size="small"
          disabled={!isArchived && selectedProject === "PREVIOUS"}
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
    </>
  );
};

const TaskView = ({
  tasks,
  projects,
  handleEditTask,
  defaultProjectDetail,
}) => {
  const getProjectDetail = (projectId) => {
    let project = defaultProjectDetail
      ? defaultProjectDetail
      : getProjectData(projects, projectId);
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
  return tasks.map((task) => (
    <li key={`${task.id}`}>
      <ListItemButton style={{ padding: 0, borderRadius: 11 }}>
        <Paper
          onClick={() => handleEditTask(task)}
          style={{ width: "100%", padding: 9, borderRadius: 11 }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <Checkbox
                isArchived={task.archived}
                id={task.id}
                taskDesc={task.task}
                taskPriority={task.priority}
              />
              <Divider className="mui-divider-custom" orientation="vertical" />
            </div>
            <div style={{ width: "78vh" }}>
              <div>
                {task.task.split("\n").map((text, index) => {
                  return (
                    <span key={text + index}>
                      <span>{text}</span>
                      {task.task.split("\n").length - 1 !== index && <br />}
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
  ));
};
