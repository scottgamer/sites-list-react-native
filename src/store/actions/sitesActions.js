export const SET_ACTIVE_SITE = "SET_ACTIVE_SITE";
export const POPULATE_SITE_DATA = "POPULATE_SITE_DATA";

export const setActiveSite = index => ({
  type: SET_ACTIVE_SITE,
  payload: { index }
});

export const populateSiteData = sites => ({
  type: POPULATE_SITE_DATA,
  payload: { sites }
});
