export const CURRENT_POSITION = 'CURRENT_POSITION';
export const mapAction = (mapState) => ({
  type: CURRENT_POSITION,
  payload: {
    currentLatitude: mapState.currentLatitude,
    currentLongitude: mapState.currentLongitude,
    LocationErrorMsg: mapState.LocationErrorMsg,
    voiceMemo: mapState.voiceMemo,
    settingCategories: mapState.settingCategories,
  },
});
