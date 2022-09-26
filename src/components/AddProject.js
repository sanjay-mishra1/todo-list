import React, { useState } from "react";
import PropTypes from "prop-types";
import { generatePushId } from "../helpers";
import { connect } from "react-redux";
import { addProject, updateProjectDetails } from "../store/actioncreator";
import { generateColor } from "../util/helper";
import { Button, Dialog, Paper } from "@mui/material";
import { colors } from "../constants";
import { MdOutlineAddBox } from "react-icons/md";

const AddProject = (props) => {
  const { shouldShow = false, uid, defaultProject, closeUpdateProject } = props;
  const [showColorSelector, setShowColorSelector] = useState(false);
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState(generateColor());
  // console.log(defaultProject);
  React.useEffect(() => {
    if (defaultProject) {
      setProjectName(defaultProject.name);
      setColor(defaultProject.color);
    }
  }, [defaultProject]);
  const showAddProject = () => {
    setColor(generateColor());
    setShow(!show);
  };
  const projectId = generatePushId();
  if (!uid && !defaultProject) return <div>User not found in AddProject</div>;
  const storeProject = () => {
    if (projectName) {
      if (defaultProject) {
        props.updateProject(
          {
            ...defaultProject,
            name: projectName,
            color: color,
          },
          successFunction
        );
      } else {
        props.addProject(
          {
            projectId,
            name: projectName,
            userId: uid,
            color: color,
          },
          successFunction
        );
      }
    }
  };
  const successFunction = () => {
    if (defaultProject) {
      closeUpdateProject(false);
    } else {
      setProjectName("");
      setShow(false);
    }
  };
  const handleColorSelect = (color) => {
    setColor(color);
    setShowColorSelector(false);
  };
  return (
    <React.Fragment>
      <div className="add-project" data-testid="add-project">
        {show && (
          <div className="add-project__input" data-testid="add-project-inner">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="add-project__name"
              data-testid="project-name"
              type="text"
              placeholder="Name your project"
            />
            <div
              style={{
                display: "flex",
                background: "white",
                marginTop: 10,
                alignItems: "center",
                border: "1px solid gray",
              }}
              onClick={() => setShowColorSelector(true)}
            >
              <div
                className="add-project__color"
                style={{ background: color, margin: "0px 0px -1px -1px" }}
              ></div>
              <span style={{ marginLeft: 10, fontSize: 14 }}>
                Project Color
              </span>
            </div>
            <br />
            <Button
              type="button"
              color="primary"
              variant="contained"
              style={{ textTransform: "capitalize" }}
              data-testid="add-task"
              onClick={storeProject}
            >
              {defaultProject ? "Update Project" : "Add Project"}
            </Button>
            <span
              aria-label="Cancel adding project"
              data-testid="hide-project-overlay"
              className="add-project__cancel"
              onClick={() => {
                if (defaultProject) {
                  closeUpdateProject(false);
                } else setShow(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") setShow(false);
              }}
              role="button"
              tabIndex={0}
            >
              Cancel
            </span>
          </div>
        )}
        {!defaultProject && (
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
            onClick={showAddProject}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShow(!show);
            }}
          >
            <MdOutlineAddBox style={{ color: "#545454" }} />
            <span className="add-task__text">Add Project</span>
          </Paper>
        )}
      </div>
      <Dialog
        open={showColorSelector}
        onClose={() => setShowColorSelector(false)}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0px 5px 0px 0px",
          }}
        >
          {colors.map((val) => (
            <div
              key={val}
              onClick={() => handleColorSelect(val)}
              style={{
                background: val,
                marginLeft: 10,
                marginTop: 10,
                cursor: "pointer",
              }}
              className="add-project__color"
            ></div>
          ))}
        </div>
      </Dialog>
    </React.Fragment>
  );
};

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return {
    projectList: state.projectList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (field1, field2) => dispatch(addProject(field1, field2)),
    updateProject: (field1, field2) =>
      dispatch(updateProjectDetails(field1, field2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
