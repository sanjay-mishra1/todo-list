import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { MdSearch } from "react-icons/md";
import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import { NoTask } from "./NoTask";
import database from "../firebase";
import { getProjectData } from "../helpers";
import { useProjectsValue } from "../context";
import { screenSizes } from "../util/helper";
import { AddTask } from "./AddTask";

export default function SearchTask({ uid }) {
  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const { projects } = useProjectsValue();
  const [searchValue, setSearchValue] = useState("");
  const handleEditTask = (task) => {
    //console.log(task);
    let project = getProjectData(projects, task.projectId);
    let name;
    //console.log(project);
    if (project) name = project.name;
    setProjectToEdit({ ...task, name });
  };
  const handleValue = (e) => {
    let val = e.target.value;
    if (val && val.length > 2) {
      setSearchValue(val);
    } else setTaskList([]);
  };
  let small = useMediaQuery(screenSizes.xs);

  React.useEffect(() => {
    if (searchValue && searchValue.length > 2) {
      setIsLoading(true);
      database
        .collection("tasks")
        .where("userId", "==", uid)
        .where("task", ">=", searchValue)
        .where("task", "<=", searchValue + "\uf8ff")
        .get()
        .then((snapshot) => {
          const newTasks = snapshot.docs.map((task) => ({
            id: task.id,
            ...task.data(),
          }));
          setTaskList(newTasks);
          setIsLoading(false);
        })
        .catch((error) => {
          //console.log("Error getting documents: ", error);
        });
    }
  }, [searchValue, uid]);
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
  return (
    <div style={{ height: "70vh" }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "auto",
        }}
      >
        <InputBase
          fullWidth
          onChange={handleValue}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Tasks"
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <MdSearch />
        </IconButton>
      </Paper>
      <br />
      <br />
      {isLoading ? (
        <CircularProgress style={{ marginLeft: "40%" }} />
      ) : searchValue && searchValue.length > 2 ? (
        taskList.length ? (
          <div style={{ background: "f1f4fa" }}>
            <ul className="tasks__list">
              {taskList.map((task) => (
                <li key={`${task.id}`}>
                  <ListItemButton style={{ padding: 0, borderRadius: 11 }}>
                    <Paper
                      onClick={() => handleEditTask(task)}
                      style={{ width: "100%", padding: 9, borderRadius: 11 }}
                    >
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "100%" }}>
                          <div>{task.task}</div>
                          <div className="project-detail-container">
                            {getProjectDetail(task.projectId)}
                          </div>
                        </div>
                      </div>
                    </Paper>
                  </ListItemButton>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <NoTask />
        )
      ) : (
        <div></div>
      )}
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
    </div>
  );
}
