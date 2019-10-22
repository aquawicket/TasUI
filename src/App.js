import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BorderAllIcon from '@material-ui/icons/BorderAll';

import { Route, Link, Switch, HashRouter as Router, Redirect } from 'react-router-dom';

import Devices from './Components/Devices';
import Info from './Components/Info';
import { cpus } from 'os';
import { Collapse } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(3),
    display: 'flex',
    // flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

const deviceGroups = [
  {
    name: 'All',
    link: '/devices/all',
    icon: <BorderAllIcon/>,
  }, {
    name: 'Favourites',
    link: '/devices/favs',
    icon: <FavoriteIcon/>,
  }  
]

const mainMenuItems = [
  {
    name: 'Devices',
    link: '/devices',
    icon: <DeveloperBoardIcon/>,
    children: deviceGroups,
  }, {
    name: 'About',
    link: '/about',
    icon: <InfoIcon/>,
  }
]


class App extends Component {


  renderChildItems(item) {
    const { classes } = this.props;

    if (item.children && item.children.length > 0) {
      return item.children.map((child, index) => {
        return(
          <ListItem button key={child.name} className={classes.nested}>
            <ListItemIcon>{child.icon}</ListItemIcon>
            <ListItemText primary={child.name} />
          </ListItem>  
        )
      })
    } 
  }


  render() {
    const { classes } = this.props;

    const listItems = mainMenuItems.map((item, index) => {
      return (
        <div>
        {/* <Link to={item.link}> */}
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        {/* </Link> */}

        {this.renderChildItems(item)}
        <Divider />
        </div>
      )
    });


    return (
      <div className={classes.root}>
        <Router>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Tasmota
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} >
            <Typography variant="h6" noWrap className={classes.title}>
                Tasmota UI
            </Typography>
            <Typography variant="subtitle2" noWrap>
                v0.0.1
            </Typography>
          </div>
          <Divider />
          <List>
            {listItems}
          </List>
        </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
              <div>
            <Switch>
              <Route exact path="/devices" component={Devices} />
              <Route path="/devices/:ip" component={Devices} />
              <Route path="/info" component={Info} />
              <Redirect exact from="/" to="/devices" />
              <Route component={Devices} />
            </Switch>
            </div>
          </main>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App)