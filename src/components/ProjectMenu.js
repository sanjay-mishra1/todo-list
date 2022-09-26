import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MdDelete, MdEdit, MdOutlineMoreVert } from "react-icons/md";
import { ListItemIcon, ListItemText } from "@mui/material";
import UpdateProject from "./UpdateProject";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ProjectMenu({ project, setOpenDelete }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MdOutlineMoreVert
        onClick={(e) => {
          handleClick(e);
          e.stopPropagation();
        }}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(e) => {
            setOpenEdit(true);
            handleClose();
            console.log("Edit clicked");
            e.stopPropagation();
          }}
          disableRipple
        >
          <ListItemIcon>
            <MdEdit fontSize={20} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setOpenDelete(true);
            handleClose();
            e.stopPropagation();
          }}
          disableRipple
        >
          <ListItemIcon>
            <MdDelete fontSize={20} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </StyledMenu>
      <UpdateProject
        project={project}
        setShowUpdateProject={setOpenEdit}
        showUpdateProject={openEdit}
      />
    </>
  );
}
