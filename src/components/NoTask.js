import { Paper } from "@mui/material";

export const NoTask = () => {
  return (
    <>
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
    </>
  );
};
