import React, { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
  FaFolder,
} from "react-icons/fa";
import Projects from "../Projects";
import { useSelectedProjectValue } from "../../context";
import AddProject from "../AddProject";

export const Sidebar = ({ uid, openMenubar, handleMenubar }) => {
  const { setSelectedProject, selectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("today");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div
      className="sidebar"
      data-testid="sidebar"
      style={
        openMenubar
          ? {
              overflow: "auto",
              display: "block",
              zIndex: 1,
              left: 0,
              // paddingTop: "4em"
            }
          : {
              overflow: "auto",
              left: 0,
              // paddingTop: "4em"
            }
      }
    >
      <ul className="sidebar__generic">
        <li
          data-testid="today"
          className={active === "today" ? "active" : undefined}
        >
          <div
            data-testid="today-action"
            aria-label="Show today's tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("today");
              setSelectedProject("TODAY");
              if (openMenubar) handleMenubar();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("today");
                setSelectedProject("TODAY");
              }
            }}
          >
            <span>
              <FaRegCalendar
                color={selectedProject === "TODAY" ? "#5930d9" : null}
              />
            </span>
            <span>Today</span>
          </div>
        </li>

        <li
          data-testid="inbox"
          className={active === "inbox" ? "active" : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("inbox");
              if (openMenubar) handleMenubar();
              setSelectedProject("INBOX");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("inbox");
                setSelectedProject("INBOX");
              }
            }}
          >
            <span>
              <FaInbox color={selectedProject === "INBOX" ? "#5930d9" : null} />
            </span>
            <span>Uncategorized</span>
          </div>
        </li>

        <li
          data-testid="next_7"
          className={active === "next_7" ? "active" : undefined}
        >
          <div
            data-testid="next_7-action"
            aria-label="Show tasks for the next 7 days"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("next_7");
              setSelectedProject("NEXT_7");
              if (openMenubar) handleMenubar();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("next_7");
                setSelectedProject("NEXT_7");
              }
            }}
          >
            <span>
              <FaRegCalendarAlt
                color={selectedProject === "NEXT_7" ? "#5930d9" : null}
              />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        aria-label="Show/hide projects"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShowProjects(!showProjects);
        }}
        role="button"
        tabIndex={0}
      >
        <span
          style={{
            fontSize: 18,
            marginLeft: 11,
            marginTop: -3,
            color: "#858585",
          }}
        >
          <FaFolder />
        </span>
        <span>Projects</span>
        <span
          style={{
            flex: 1,
            textAlign: "-webkit-right",
            marginRight: 16,
            color: "#858585",
          }}
        >
          <FaChevronDown
            className={!showProjects ? "hidden-projects" : undefined}
          />
        </span>
      </div>

      <ul className="sidebar__projects">
        {showProjects && (
          <Projects
            handleMenubar={handleMenubar}
            setActive={setActive}
            active={active}
          />
        )}
      </ul>

      {showProjects && <AddProject uid={uid} />}
    </div>
  );
};
