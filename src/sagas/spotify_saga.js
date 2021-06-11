import { put, takeLatest, all } from "redux-saga/effects";
import {GET_ACCESS_TOKEN,SET_ACCESS_TOKEN,GET_PLAYLIST,SET_PLAYLIST} from '../constants/spotify_constants'
import axios from "axios";
import qs from 'qs';
import * as selectors from '../selectors/selectors';
import {select} from 'redux-saga/effects';

//to get access token of spotify api
const getAccessTokenActionrunOurAction = function* () {
    let token=''
    yield axios.post('https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'client_credentials'
    }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic YWUzZDY3ODFhODMwNDI3MGI2NjQwNjdmZWQzOGU2OGQ6ODJiODkyNDZjNjA3NDM4OGI1OWQ3ZmNmOWMyMmU1Njc="
      }
    }).then(function(response) {
        token=response.data.access_token
    });
    yield put({ type: SET_ACCESS_TOKEN, payload: token });
    yield put({ type: GET_PLAYLIST, payload: token });
  };
  function* getAccessTokenActionDataWatcher() {
    yield takeLatest(GET_ACCESS_TOKEN, getAccessTokenActionrunOurAction);
  }

  //to get featured playlist from spotify api
  const getFeaturedPlaylistActionrunOurAction = function* (data) {
    const accessToken = yield select(selectors.accessToken);
      let playlist=[]
    yield axios.get('https://api.spotify.com/v1/browse/featured-playlists?country=IN&locale=&limit=50', { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(response => {
        response.data.playlists.items.map(list => {
          let cover=list.description.substring(list.description.indexOf('Cover')+7,list.description.length).split(' ')
            playlist.push({id:list.id,primary:list.name,img:list.images[0].url,cover:cover[0]+cover[1]})
        })
     })
   
    yield put({ type: SET_PLAYLIST, payload: playlist });
  };
  function* getFeaturedPlaylistActionDataWatcher(data) {
    yield takeLatest(GET_PLAYLIST, getFeaturedPlaylistActionrunOurAction);
  }

  export default function* rootSaga() {
    yield all([getAccessTokenActionDataWatcher(),getFeaturedPlaylistActionDataWatcher()]);
  }