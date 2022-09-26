import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import AddProject from "./AddProject";

export default function UpdateProject({
  showUpdateProject,
  project,
  setShowUpdateProject,
}) {
  let small = useMediaQuery("(max-width: 900px)");

  return (
    <Dialog
      fullWidth
      fullScreen={small}
      open={showUpdateProject}
      onClose={() => setShowUpdateProject(false)}
    >
      <DialogTitle>Update Project</DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <AddProject
          shouldShow={true}
          defaultProject={project}
          closeUpdateProject={setShowUpdateProject}
        />
      </DialogContent>
    </Dialog>
  );
}
