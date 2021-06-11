import { all } from "redux-saga/effects";
import spotifySaga from "../sagas/spotify_saga";

function* rootSaga() {
  yield all([spotifySaga()]);
}

export default rootSaga;
