import React from "react";
import moment from "moment";
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from "react-icons/fa";
import PropTypes from "prop-types";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { TextField } from "@mui/material";

export const TaskDate = ({
  setTaskDate,
  defaultDate,
  showTaskDate,
  setShowTaskDate,
}) => {
  const [value, setValue] = React.useState(
    defaultDate ? moment(defaultDate, "DD/MM/YYYY") : moment.now()
  );

  const handleChange = (newValue) => {
    setTaskDate(moment(newValue).format("DD/MM/YYYY"));
    // setTaskDate("Test");
    setValue(newValue);
  };
  const openDateSelector = () => {
    document.getElementById("app-date-selector").click();
  };
  return (
    <React.Fragment>
      {showTaskDate && (
        <div className="task-date" data-testid="task-date-overlay">
          <ul className="task-date__list">
            <li>
              <div
                onClick={() => {
                  setShowTaskDate(false);
                  setTaskDate(moment().format("DD/MM/YYYY"));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowTaskDate(false);
                    setTaskDate(moment().format("DD/MM/YYYY"));
                  }
                }}
                data-testid="task-date-today"
                tabIndex={0}
                aria-label="Select today as the task date"
                role="button"
              >
                <span>
                  <FaSpaceShuttle />
                </span>
                <span>Today</span>
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowTaskDate(false);
                    setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
                  }
                }}
                data-testid="task-date-tomorrow"
                role="button"
                tabIndex={0}
                aria-label="Select tomorrow as the task date"
              >
                <span>
                  <FaSun />
                </span>
                <span>Tomorrow</span>
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  setShowTaskDate(false);
                  // setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
                  openDateSelector();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowTaskDate(false);
                    // setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
                    openDateSelector();
                  }
                }}
                data-testid="task-date-next-week"
                aria-label="Select next week as the task date"
                tabIndex={0}
                role="button"
              >
                <span>
                  <FaRegPaperPlane />
                </span>
                <span>Select Date</span>
              </div>
            </li>
          </ul>
        </div>
      )}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDatePicker
          label="Select task date"
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              id="app-date-selector"
              style={{ visibility: "hidden" }}
              type="hidden"
              {...params}
            />
          )}
        />
      </LocalizationProvider>
    </React.Fragment>
  );
};

TaskDate.propTypes = {
  setTaskDate: PropTypes.func.isRequired,
  showTaskDate: PropTypes.bool.isRequired,
  setShowTaskDate: PropTypes.func.isRequired,
};
