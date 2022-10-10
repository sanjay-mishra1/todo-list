import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineAddBox, MdOutlineClear } from "react-icons/md";
import moment from "moment";
import PropTypes from "prop-types";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";
import database from "../firebase";
import { Button, Checkbox, Divider, Paper } from "@mui/material";
import { getProjectData } from "../helpers";
import { PriorityOverlay } from "./PriorityOverlay";
import { IoMdFlag } from "react-icons/io";
import { getPriorityColor } from "../util/helper";
import Comments from "./Comments";
import { deleteComments } from "../store/actioncreator";

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
  defaultTask,
  uid,
  hideParentBox,
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(
    defaultTask ? defaultTask.archived : false
  );
  const [showTaskDate, setShowTaskDate] = useState(false);
  const { projects } = useProjectsValue();
  const { selectedProject } = useSelectedProjectValue();
  const [project, setProject] = useState("");
  const [projectName, setProjectName] = useState("");
  const [ShowPriorityOverlay, setShowPriorityOverlay] = useState(false);
  const [priorityName, setPriorityName] = useState("");
  //console.log("selected project", selectedProject, projects, defaultTask);
  React.useEffect(() => {
    if (projects) {
      let tempProject = getProjectData(projects, selectedProject);
      if (tempProject) {
        setProject(selectedProject);
        setProjectName(tempProject.name);
      } else {
        setProject("");
        setProjectName("");
        setTaskDate("");
        setPriorityName("");
        if (selectedProject === "TODAY")
          setTaskDate(moment().format("DD/MM/YYYY"));
      }
    }
  }, [selectedProject, projects]);
  React.useEffect(() => {
    if (defaultTask) {
      //console.log(defaultTask);
      setTask(defaultTask.task);
      setProject(defaultTask.projectId);
      setProjectName(defaultTask.name);
      setTaskDate(defaultTask.date);
      setPriorityName(defaultTask.priority ?? "");
      setShowMain(true);
    }
  }, [defaultTask]);
  const handleCancel = () => {
    setShowMain(false);
    setShowProjectOverlay(false);
    setTaskDate("");
    if (setShowQuickAddTask) setShowQuickAddTask(false);
    if (hideParentBox) hideParentBox();
  };
  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }
    const field = {
      projectId,
      archived: isTaskCompleted,
      task,
      date: collatedDate || taskDate,
      priority: priorityName,
    };
    if (defaultTask) {
      // default not have completedOn field and we clicked on checkbox to make it complete
      if (
        (!defaultTask.completedOn && isTaskCompleted) ||
        (defaultTask.completedOn && !defaultTask.archived && isTaskCompleted)
      )
        field["completedOn"] = moment.now();
    }
    return (
      task &&
      projectId &&
      (defaultTask
        ? database
            .collection("tasks")
            .doc(defaultTask.id)
            .update(field)
            .then(() => {
              setTask("");
              setProject("");
              setTaskDate("");
              hideParentBox();
            })
        : database
            .collection("tasks")
            .add({
              archived: false,
              projectId,
              task,
              date: collatedDate || taskDate,
              userId: uid,
              priority: priorityName,
              createdAt: moment.now(),
            })
            .then(() => {
              setTask("");
              setProject("");
              setTaskDate("");
              setShowMain("");
              setShowProjectOverlay(false);
              //console.log("Added task " + task + " successfully.");
            }))
    );
  };
  const deleteTask = () => {
    console.log("Deleting task....", defaultTask.id);
    return database
      .collection("tasks")
      .doc(defaultTask.id)
      .delete()
      .then(() => {
        setTask("");
        setProject("");
        setTaskDate("");
        hideParentBox();
        //delete comments
        deleteComments(defaultTask.id);
      });
  };
  const openAddTaskView = () => {
    setTaskDate("");
    setPriorityName("");
    setShowMain(!showMain);
    if (selectedProject === "TODAY") setTaskDate(moment().format("DD/MM/YYYY"));
    setTimeout(() => {
      if (!showMain)
        document.getElementById("add-task-button-container").scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  };
  return !uid ? (
    <div>User not found in AddTask</div>
  ) : (
    <div
      className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <>
          <Comments id={selectedProject} user={uid} />

          <div
            className="add-task__shallow"
            data-testid="show-main-action"
            onClick={openAddTaskView}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowMain(!showMain);
            }}
            tabIndex={0}
            aria-label="Add task"
            role="button"
          >
            <Paper
              variant="outlined"
              style={{
                width: "100%",
                padding: 9,
                borderRadius: 11,
                borderStyle: "dashed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdOutlineAddBox style={{ color: "#545454" }} />
              <span className="add-task__text">Add Task</span>
            </Paper>
          </div>
        </>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <>
              <div data-testid="quick-add-task">
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  data-testid="add-task-quick-cancel"
                  aria-label="Cancel adding task"
                  onClick={handleCancel}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCancel();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <MdOutlineClear />
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            setProjectName={setProjectName}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            defaultDate={taskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <PriorityOverlay
            setPriorityName={setPriorityName}
            setShowPriorityOverlay={setShowPriorityOverlay}
            showPriorityOverlay={ShowPriorityOverlay}
          />
          {defaultTask && (
            <>
              <Paper
                variant="outlined"
                style={{
                  padding: 9,
                  borderRadius: 11,
                  borderStyle: "dashed",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    display: "flex",
                    padding: 10,
                  }}
                >
                  <div>Created At</div>
                  <div>
                    {moment(defaultTask.createdAt).format("DD MMM HH:mm")}
                  </div>
                </div>
                <Divider />

                <div
                  style={{
                    justifyContent: "space-between",
                    width: "100%",
                    display: "flex",
                    padding: 10,
                  }}
                >
                  <div>Created By</div>
                  <div>{defaultTask.userId}</div>
                </div>
                {defaultTask.completedOn && (
                  <>
                    <Divider />
                    <div
                      style={{
                        justifyContent: "space-between",
                        width: "100%",
                        display: "flex",
                        padding: 10,
                      }}
                    >
                      <div>Task completed on</div>
                      <div>
                        {moment(defaultTask.completedOn).format("DD MMM HH:mm")}
                      </div>
                    </div>
                  </>
                )}
              </Paper>
              <br />
            </>
          )}

          <Paper
            variant="outlined"
            style={{
              width: "100%",
              padding: 9,
              borderRadius: 11,
              borderStyle: "dashed",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <textarea
              className="add-task__content"
              aria-label="Enter your task"
              data-testid="add-task-content"
              placeholder={`${defaultTask ? "Update" : "Add new"} task`}
              type="paragraph"
              value={task}
              rows="5"
              onChange={(e) => setTask(e.target.value)}
            ></textarea>

            <Button
              onClick={() => setShowProjectOverlay(!showProjectOverlay)}
              fullWidth
              size="small"
              style={{
                height: 40,
                marginTop: 10,
                textAlign: "start",
                marginBottom: 10,
                border: "1px solid rgb(221 221 221)",
                textTransform: "capitalize",
                color: "black",
              }}
              endIcon={
                <span
                  style={{ marginRight: 10 }}
                  className="add-task__project"
                  data-testid="show-project-overlay"
                  tabIndex={0}
                >
                  <FaRegListAlt />
                </span>
              }
              variant="outlined"
              color="primary"
            >
              <p style={{ width: "100%" }}>
                {project ? projectName : "Select Project"}
              </p>
            </Button>
            <Button
              onClick={() => setShowTaskDate(!showTaskDate)}
              fullWidth
              size="small"
              variant="outlined"
              style={{
                height: 40,
                marginBottom: 10,
                border: "1px solid rgb(221 221 221)",
                textTransform: "capitalize",
                textAlign: "start",
                color: "black",
              }}
              color="primary"
              endIcon={
                <span
                  className="add-task__date"
                  data-testid="show-task-date-overlay"
                  tabIndex={0}
                >
                  <FaRegCalendarAlt />
                </span>
              }
            >
              <p style={{ width: "100%" }}>
                {taskDate ? taskDate : "Select Date"}
              </p>
            </Button>

            <Button
              onClick={() => setShowPriorityOverlay(!ShowPriorityOverlay)}
              fullWidth
              size="small"
              variant="outlined"
              style={{
                height: 40,
                marginBottom: 10,
                border: "1px solid rgb(221 221 221)",
                textTransform: "capitalize",
                textAlign: "start",
                color: "black",
              }}
              color="primary"
              endIcon={
                <span
                  className="add-task__date"
                  data-testid="show-task-date-overlay"
                  tabIndex={0}
                >
                  <IoMdFlag color={getPriorityColor(priorityName)} />
                </span>
              }
            >
              <p style={{ width: "100%" }}>
                {priorityName ? priorityName : "Select Priority"}
              </p>
            </Button>

            {defaultTask && (
              <Button
                onClick={() => setIsTaskCompleted(!isTaskCompleted)}
                fullWidth
                size="small"
                variant="outlined"
                style={{
                  height: 40,
                  border: "1px solid rgb(221 221 221)",
                  textTransform: "capitalize",
                  textAlign: "start",
                  color: "black",
                }}
                color="primary"
                endIcon={
                  <span
                    className="add-task__date"
                    data-testid="show-task-date-overlay"
                    tabIndex={0}
                  >
                    <Checkbox
                      checked={isTaskCompleted}
                      style={{ marginRight: -12 }}
                      onChange={() => setIsTaskCompleted(!isTaskCompleted)}
                    />
                  </span>
                }
              >
                <p style={{ width: "100%" }}>
                  {isTaskCompleted ? "Task is completed" : "Task is pending"}
                </p>
              </Button>
            )}
            <br />
            <br />
            <Button
              type="button"
              color="primary"
              id="add-task-button-container"
              variant="contained"
              style={{ textTransform: "capitalize" }}
              data-testid="add-task"
              onClick={() =>
                showQuickAddTask
                  ? addTask() && setShowQuickAddTask(false)
                  : addTask()
              }
            >
              {defaultTask ? "Update Task" : "Add Task"}
            </Button>
            {defaultTask && (
              <Button
                onClick={deleteTask}
                color="error"
                variant="contained"
                style={{ textTransform: "capitalize", marginLeft: 15 }}
              >
                Delete Task
              </Button>
            )}
            {!showQuickAddTask && (
              <span
                className="add-task__cancel"
                data-testid="add-task-main-cancel"
                onClick={handleCancel}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // setShowMain(false);
                    // setShowProjectOverlay(false);
                    handleCancel();
                  }
                }}
                aria-label="Cancel adding a task"
                tabIndex={0}
                role="button"
                style={{ float: "right", marginTop: 15 }}
              >
                Cancel
              </span>
            )}
          </Paper>
        </div>
      )}
      {showMain && (
        <>
          <br />
          <br />
        </>
      )}
    </div>
  );
};

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func,
};
