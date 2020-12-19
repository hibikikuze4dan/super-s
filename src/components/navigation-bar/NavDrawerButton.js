import { Drawer, IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useState } from "react";
import NavDrawerLinks from "./NavDrawerLinks";

const NavDrawerButton = () => {
  const [open, toggleOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => toggleOpen(!open)}>
        <Menu fontSize="large" />
      </IconButton>
      <Drawer open={open} onClose={() => toggleOpen(!open)}>
        <NavDrawerLinks handleSelect={toggleOpen} />
      </Drawer>
    </>
  );
};

export default NavDrawerButton;
