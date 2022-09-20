import { Paper } from "@mui/material";

export const NoTask = ({ selectedProject }) => {
  return (
    <>
      {selectedProject === "TODAY" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            width={"52%"}
            src="./images/completed-task.png"
            alt="Task completed"
          />
          <br />

          <p>You're all done for today!</p>
          <br />
          <small style={{ color: "gray" }}>Enjoy the rest of your day.</small>
        </div>
      ) : selectedProject === "INBOX" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img width={"52%"} src="./images/project.png" alt="Project Task" />
          <br />

          <p>Keep your tasks organized in projects</p>
          <br />
          <small
            style={{ color: "gray", paddingLeft: "16%", textAlign: "center" }}
          >
            Group your tasks by goal or area of your life. It will help you to
            manage your task efficiently.
          </small>
        </div>
      ) : (
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
          <span className="add-task__text">No task found</span>
        </Paper>
      )}
    </>
  );
};
