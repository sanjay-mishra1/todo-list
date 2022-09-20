import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import IndividualProject from "./IndividualProject";
import { connect } from "react-redux";

const Projects = (props) => {
  const { active, setActive, handleMenubar } = props;
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  //console.log(props);
  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? "active sidebar__project"
            : "sidebar__project"
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
            handleMenubar();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return {
    projectList: state.data.projectList,
  };
};
export default connect(mapStateToProps, {})(Projects);
