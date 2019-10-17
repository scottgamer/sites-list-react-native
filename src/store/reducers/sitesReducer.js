import * as Actions from '../actions';

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
      const sitesData = action.payload.sites.map((site, index) => {
        site.index = index.toString();
        return site;
      });
      return {
        ...state,
        sites: sitesData
      };
    }
    case Actions.POPULATE_MORE_SITE_DATA: {
      const sitesData = state.sites.concat(action.payload.sites);
      const newSitesData = sitesData.map((site, index) => {
        site.index = index.toString();
        return site;
      });

      return {
        ...state,
        sites: newSitesData
      };
    }
    default: {
      return state;
    }
  }
};

export default sitesReducer;
