import React from "react";
import { ViewType } from "../constants";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const TaskViewTypeOverlay = ({
  showViewTypeOverlay,
  setShowViewTypeOverlay,
  setViewTypeName,
}) => {
  return (
    ViewType &&
    showViewTypeOverlay && (
      <>
        <BasicMenu
          showViewTypeOverlay={showViewTypeOverlay}
          setShowViewTypeOverlay={setShowViewTypeOverlay}
          setViewTypeName={setViewTypeName}
        />
      </>
    )
  );
};

function BasicMenu({
  showViewTypeOverlay,
  setShowViewTypeOverlay,
  setViewTypeName,
}) {
  const open = Boolean(showViewTypeOverlay);

  const handleClose = (key) => {
    setShowViewTypeOverlay(null);
    if (key && typeof key === "string") setViewTypeName(key);
  };

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={showViewTypeOverlay}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {ViewType.map((project) => (
          <MenuItem
            onClick={() => {
              handleClose(project.key);
            }}
            key={project.key}
          >
            {project.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
