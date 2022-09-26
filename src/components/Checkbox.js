import React from "react";
import PropTypes from "prop-types";
import database from "../firebase";
import moment from "moment";
import { BsCheck } from "react-icons/bs";
import { getPriorityColor } from "../util/helper";

export const Checkbox = ({ id, taskDesc, taskPriority, isArchived }) => {
  const archiveTask = (e) => {
    e.stopPropagation();
    database
      .collection("tasks")
      .doc(id)
      .update({
        archived: true,
        completedOn: moment.now(),
      })
      .then(() => {
        //console.log("Updated task " + taskDesc);
      })
      .catch((error) => {
        //console.log("Updated task  failed:" + error);
      });
  };
  let color = getPriorityColor(taskPriority) ?? "initial";
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={(e) => archiveTask(e)}
      onKeyDown={(e) => {
        if (e.key === "Enter") archiveTask(e);
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span
        style={{
          borderColor: color,
        }}
        className="checkbox"
      >
        <BsCheck
          className={isArchived ? "" : "checkbox-tick"}
          color={color}
          style={{ paddingBottom: 2, paddingRight: 2 }}
        />
      </span>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
