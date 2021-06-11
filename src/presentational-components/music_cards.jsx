import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, IconButton, Typography, Grid } from "@material-ui/core";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useSelector } from "react-redux";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151,
    backgroundPosition: 'center'
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

export default function MusicCards() {
  const classes = useStyles();
  const theme = useTheme();
  const localSavedPlaylist = useSelector((state) => state.spotifyReducer.localSavedPlaylist);
  return (
    <div>
      <Grid container spacing={1}>
        {localSavedPlaylist.map(music => {
          return (
            <Grid key={music.id} item lg={3} md={6} sm={12} xs={12}>
              <Card className={classes.root}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {music.primary}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {music.cover}
                    </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                    <IconButton aria-label="previous">
                      {theme.direction === "rtl" ? (
                        <SkipNextIcon />
                      ) : (
                          <SkipPreviousIcon />
                        )}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                      <PlayArrowIcon className={classes.playIcon} />
                    </IconButton>
                    <IconButton aria-label="next">
                      {theme.direction === "rtl" ? (
                        <SkipPreviousIcon />
                      ) : (
                          <SkipNextIcon />
                        )}
                    </IconButton>
                  </div>
                </div>
                <CardMedia
                  className={classes.cover}
                  style={{ backgroundImage: `url(${music.img})` }}
                  src={music.img}
                  title="Live from space album cover"
                />
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}
