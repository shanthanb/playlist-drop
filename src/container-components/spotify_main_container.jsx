import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, CssBaseline, Divider, Drawer, Hidden, List, Toolbar, Typography, Button, Box, ListSubheader } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { DragDropContext } from 'react-beautiful-dnd'
import spotifyActions from '../actions/spotify_actions'
import { useDispatch } from "react-redux";
import MusicCards from '../presentational-components/music_cards'
import PlayList from '../presentational-components/playlist'
import '../styles/styles.css'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh'
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <div className={classes.toolbar} id="side_drawer">
                <Typography variant="h6" noWrap className="spotify_typography">
                    <Box display="flex" p={1}>
                        <Box p={1} className="icon_box">
                            <img src="https://img.icons8.com/ios/50/26e07f/spotify.png" />
                        </Box>
                        <Box p={1} flexGrow={1} className="name_box">
                            Spotify
                        </Box>
                    </Box>
                </Typography>
            </div>
            <Divider />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        FEATURED PLAYLIST
                    </ListSubheader>
                }
            />
            <PlayList />
        </div>
    );
    const onDragEnd = () => {

    }
    const onMouseEnter = () => {
        dispatch(spotifyActions.getOnMouseFlag(true))
    }
    const onMouseLeave = () => {
        dispatch(spotifyActions.getOnMouseFlag(false))
    }
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <DragDropContext onDragEnd={onDragEnd}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar} color='secondary'>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            My Playlist
                    </Typography>
                        <div>
                            <Button
                                variant="outlined"
                                className="button_circle"
                                size="medium"
                                startIcon={<AccountCircleIcon />}
                            >
                                Shanthan
                        </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main id="content_area" className={classes.content} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <div className={classes.toolbar} />
                    <MusicCards />
                </main>
            </DragDropContext>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
