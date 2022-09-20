import React, { useState } from "react";
import PropTypes from "prop-types";
import { generatePushId } from "../helpers";
import { connect } from "react-redux";
import { addProject } from "../store/actioncreator";
import { generateColor } from "../util/helper";
import { Button, Dialog, Paper } from "@mui/material";
import { colors } from "../constants";
import { MdOutlineAddBox } from "react-icons/md";

const AddProject = (props) => {
  const { shouldShow = false, uid } = props;
  const [showColorSelector, setShowColorSelector] = useState(false);
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState(generateColor());

  const showAddProject = () => {
    setColor(generateColor());
    setShow(!show);
  };
  const projectId = generatePushId();
  if (!uid) return <div>User not found in AddProject</div>;
  const storeProject = () => {
    if (projectName)
      props.addProject(
        {
          projectId,
          name: projectName,
          userId: uid,
          color: color,
        },
        successFunction
      );
  };
  const successFunction = () => {
    setProjectName("");
    setShow(false);
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
                style={{ background: color }}
              ></div>
              <span style={{ marginLeft: 10, fontSize: 14 }}>
                Project Color
              </span>
            </div>
            {/* <button
              className="add-project__submit"
              type="button"
              onClick={storeProject}
              data-testid="add-project-submit"
            >
              Add Project
            </button> */}
            <br />
            <Button
              type="button"
              color="primary"
              variant="contained"
              style={{ textTransform: "capitalize" }}
              data-testid="add-task"
              onClick={storeProject}
            >
              Add Project
            </Button>
            <span
              aria-label="Cancel adding project"
              data-testid="hide-project-overlay"
              className="add-project__cancel"
              onClick={() => setShow(false)}
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
      </div>
      <Dialog
        open={showColorSelector}
        onClose={() => setShowColorSelector(false)}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
