import * as spotifyConstants from '../constants/spotify_constants';

const spotifyActions = (payload) => ({
    getAccessToken: () => ({
        type: spotifyConstants.GET_ACCESS_TOKEN,
      }),
      getFeaturedPlaylist: (payload) => ({
        type: spotifyConstants.GET_PLAYLIST,
        payload
      }),
      getOnMouseFlag: (payload) => ({
        type: spotifyConstants.GET_ONMOUSE_FLAG,
        payload
      }),
      getLocalSavedPlaylist: (payload) => ({
        type: spotifyConstants.GET_LOCAL_SAVED_PLAYLIST,
        payload
      }),
      getDraggedIds: (payload) => ({
        type: spotifyConstants.GET_DRAGGED_IDS,
        payload
      }),
})
export default spotifyActions();
