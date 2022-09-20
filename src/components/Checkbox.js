import React from "react";
import PropTypes from "prop-types";
import database from "../firebase";
import moment from "moment";

export const Checkbox = ({ id, taskDesc }) => {
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
      <span className="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
