import * as Actions from "../actions";

const initialState = {
  sites: [],
  activeSite: {}
};

const sitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_ACTIVE_SITE: {
      const newActiveSite = state.sites[action.payload.index];
      return {
        ...state,
        activeSite: newActiveSite
      };
    }
    case Actions.POPULATE_SITE_DATA: {
      return {
        ...state,
        sites: action.payload.sites
      };
    }
    default: {
      return state;
    }
  }
};

export default sitesReducer;
