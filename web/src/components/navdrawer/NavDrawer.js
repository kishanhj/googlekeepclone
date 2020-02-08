import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  Typography,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import {
  WbIncandescentOutlined as IdeaIcon,
  LabelOutlined as LabelIcon
} from "@material-ui/icons";
import DrawerItem from "./DrawerItem";
import { useStoreState, useStoreActions } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: theme.mixins.drawer.minWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: theme.mixins.drawer.minWidth,
    border: 0
  },
  sectionTitle: {
    padding: theme.spacing(2, 1, 0, 2),
    color: theme.palette.text.secondary
  },
  toolbar: theme.mixins.toolbar
}));

export default function NavDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isNavBarOpen = useStoreState(state => state.ui.isNavBarOpen);
  const labelItems = useStoreState(state => state.notes.labels);
  const selectedLabelId = useStoreState(state => state.ui.selectedLabelId);
  const setSelectedLabelId = useStoreActions(actions => actions.ui.setSelectedLabelId);
  const toggleNavBar = useStoreActions(actions => actions.ui.toggleNavBar);
  const filterNotesItemsByLabelId = useStoreActions(actions => actions.notes.filterNotesByLabelId);

  const onDrawerItemSelected = (labelId) => {
    setSelectedLabelId(labelId);
    filterNotesItemsByLabelId(labelId);
  }
 
  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={isNavBarOpen}
      onClose={toggleNavBar}
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <DrawerItem
          text={"Notes"}
          isSelected={selectedLabelId === ""}
          icon={<IdeaIcon />}
          onClick={() => onDrawerItemSelected("")}
        />
      </List>
      <Divider />
      <div className={classes.sectionTitle}>
        <Typography variant="overline" component="span">
          Labels
        </Typography>
      </div>
      <List>
        {Object.keys(labelItems).map(labelId => (
          <DrawerItem
            key={labelId}
            text={labelItems[labelId]}
            icon={<LabelIcon />}
            isSelected={selectedLabelId === labelId}
            onClick={() => onDrawerItemSelected(labelId)}
          />
        ))}
      </List>
    </Drawer>
  );
}