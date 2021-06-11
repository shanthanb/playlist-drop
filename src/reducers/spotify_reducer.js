import * as spotifyConstants from '../constants/spotify_constants';

const initialState = {
    accessToken:'',
    featuredPlaylist:[],
    onMouseFlag:false,
    localSavedPlaylist:[],
    getDraggedIDs:[],
    foo: {
      bar: 'zoo',
      nested: {
        veryDeep: true,
      },
    },
}
const spotifyReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {

        case spotifyConstants.SET_ACCESS_TOKEN:
        newState.accessToken = action.payload;
      return newState

      case spotifyConstants.SET_PLAYLIST:
        newState.featuredPlaylist = action.payload;
      return newState

      case spotifyConstants.GET_ONMOUSE_FLAG:
        newState.onMouseFlag = action.payload;
      return newState

      case spotifyConstants.GET_LOCAL_SAVED_PLAYLIST:
        newState.localSavedPlaylist = action.payload;
      return newState

      case spotifyConstants.GET_DRAGGED_IDS:
        newState.getDraggedIDs = action.payload;
      return newState

      default:
      return state;
    }
}
export default spotifyReducer;