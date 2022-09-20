import React from "react";
import PropTypes from "prop-types";
import { useProjectsValue } from "../context";

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
  setProjectName,
}) => {
  const { projects } = useProjectsValue();

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setProject(project.projectId);
                  setProjectName(project.name);
                  setShowProjectOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setProject(project.projectId);
                    setProjectName(project.name);
                    setShowProjectOverlay(false);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the task project"
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProjectOverlay.propTypes = {
  projects: PropTypes.array,
};
