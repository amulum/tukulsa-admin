import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "../../App.css";
// ICONS
const LeftMenu = props => {
  return props.listIcon.map((item, key) => (
    <ListItem
      button
      key={key}
      onClick={
        props.handleLogout
          ? props.handleLogout
          : () => props.changePages(item.name)
      }
    >
      <ListItemIcon>{item.value}</ListItemIcon>
      <ListItemText primary={item.name}></ListItemText>
    </ListItem>
  ));
};

export default withRouter(LeftMenu);
