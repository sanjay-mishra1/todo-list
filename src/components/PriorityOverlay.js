import React from "react";
import { priority } from "../constants";
import { IoMdFlag } from "react-icons/io";
import { TbFlag2Off } from "react-icons/tb";
export const PriorityOverlay = ({
  showPriorityOverlay,
  setShowPriorityOverlay,
  setPriorityName,
}) => {
  return (
    priority &&
    showPriorityOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {priority.map((project) => (
            <li key={project.key}>
              <div
                data-testid="project-overlay-action"
                style={{ padding: 1 }}
                onClick={() => {
                  setPriorityName(project.key);
                  setShowPriorityOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPriorityName(project.key);
                    setShowPriorityOverlay(false);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the priority"
              >
                <div style={{ display: "flex" }}>
                  <IoMdFlag color={project.color} size="20px" />
                  &nbsp;
                  <p>{project.name}</p>
                </div>
              </div>
            </li>
          ))}
          <li>
            <div
              style={{ padding: 1 }}
              onClick={() => {
                setPriorityName("");
                setShowPriorityOverlay(false);
              }}
            >
              <div style={{ display: "flex" }}>
                <TbFlag2Off color="black" size="20px" />
                <p>None</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  );
};
