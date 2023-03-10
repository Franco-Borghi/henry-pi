import { GET_GENRES, GET_VIDEOGAMES } from "../actions";

const initialState = {
  genres: null,
  videogames: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload
      }

    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload
      }

    default:
      return {...state};
  }
};

export default rootReducer;