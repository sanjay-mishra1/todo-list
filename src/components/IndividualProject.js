import React, { useState } from "react";
import PropTypes from "prop-types";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { Button, Dialog } from "@mui/material";
import { connect } from "react-redux";
import { deleteProject } from "../store/actioncreator";
import ProjectMenu from "./ProjectMenu";
const IndividualProject = (props) => {
  let { selectedProject } = useSelectedProjectValue();
  const { project, uid } = props;
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();
  // console.log(selectedProject);
  const deleteProject = (docId) => {
    props.deleteProject(docId, successFunction);
  };
  const successFunction = () => {
    setProjects([...projects]);
    setSelectedProject("INBOX");
  };
  return (
    <>
      <span
        className="sidebar__dot"
        style={{ backgroundColor: project.color, width: 12, height: 12 }}
      ></span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        style={
          selectedProject && selectedProject === project.projectId
            ? { display: "flex" }
            : null
        }
        // onClick={() => setShowConfirm(!showConfirm)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") setShowConfirm(!showConfirm);
        // }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        {/* <MdMoreVert /> */}
        <ProjectMenu
          uid={uid}
          project={project}
          setOpenDelete={setShowConfirm}
        />
      </span>

      {showConfirm && (
        <Dialog onClose={() => setShowConfirm(false)} open={true}>
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>
                Are you sure you want to delete <b>{project.name}</b> project?
              </p>
              <Button
                color="error"
                variant="contained"
                style={{ textTransform: "capitalize" }}
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </Button>
              <Button
                style={{ textTransform: "capitalize", color: "gray" }}
                color="info"
                variant="text"
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                role="button"
                aria-label="Cancel adding project, do not delete"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (field1, field2) => dispatch(deleteProject(field1, field2)),
  };
};

export default connect(null, mapDispatchToProps)(IndividualProject);
