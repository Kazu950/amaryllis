export const CURRENT_POSITION = 'CURRENT_POSITION';
export const mapAction = (mapState) => ({
  type: CURRENT_POSITION,
  payload: {
    currentLatitude: mapState.currentLatitude,
    currentLongitude: mapState.currentLongitude,
    errorMsg: mapState.errorMsg,
    voiceMemo: mapState.voiceMemo,
  },
});
