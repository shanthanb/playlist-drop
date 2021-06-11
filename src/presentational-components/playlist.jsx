import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, IconButton, ListItemSecondaryAction, Avatar, Tooltip, Zoom } from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import { useDispatch, useSelector } from "react-redux";
import spotifyActions from '../actions/spotify_actions'


const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "#000000",
  })
});

const getListStyle = (isDraggingOver) => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

export default function PlayList() {
  const dispatch = useDispatch();
  const onMouseFlag = useSelector((state) => state.spotifyReducer.onMouseFlag);
  const localSavedPlaylist = useSelector((state) => state.spotifyReducer.localSavedPlaylist);
  const featuredPlaylist = useSelector((state) => state.spotifyReducer.featuredPlaylist);
  const getDraggedIDs = useSelector((state) => state.spotifyReducer.getDraggedIDs);

  const onDragEnd = (result) => {
    let index = result.source.index;
    let localPlaylist = [...localSavedPlaylist], draggableId = [...getDraggedIDs];
    if (onMouseFlag) {
      localPlaylist.push(featuredPlaylist[index]);
      draggableId.push(result.draggableId)
      dispatch(spotifyActions.getLocalSavedPlaylist(localPlaylist));
      dispatch(spotifyActions.getDraggedIds(draggableId));
    }
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {featuredPlaylist.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    isDragDisabled={getDraggedIDs.includes(item.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Tooltip title={getDraggedIDs.includes(item.id) ? 'Already added to playlist' : 'Drag right to add it to your playlist'} TransitionComponent={Zoom} placement='top' arrow>
                        <div>
                          <ListItem className="playlist_items"
                            ContainerComponent="li"
                            ContainerProps={{ ref: provided.innerRef }}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <ListItemIcon>
                              <Avatar alt="Remy Sharp" src={item.img} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item.primary}
                              secondary={item.secondary}
                            />
                            <ListItemSecondaryAction>
                              <IconButton>
                                <FeaturedPlayListOutlinedIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </div>
                      </Tooltip>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
}

