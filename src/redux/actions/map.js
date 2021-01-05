export const LOCATION_PERMISSION = 'LOCATION_PERMISSION';
export const permissionAction = (mapState) => ({
  type: LOCATION_PERMISSION,
  payload: {
    LocationErrorMsg: mapState.LocationErrorMsg,
  },
});

export const CURRENT_POSITION = 'CURRENT_POSITION';
export const currentLocationAction = (mapState) => ({
  type: CURRENT_POSITION,
  payload: {
    currentLatitude: mapState.currentLatitude,
    currentLongitude: mapState.currentLongitude,
  },
});

export const VOICEMEMO = 'VOICEMEMO';
export const voiceAction = (mapState) => ({
  type: VOICEMEMO,
  payload: {
    voiceMemo: mapState.voiceMemo,
  },
});

export const SETTING_CATEGORY = 'SETTING_CATEGORY';
export const settingAction = (mapState) => ({
  type: CURRENT_POSITION,
  payload: {
    settingCategories: mapState.settingCategories,
  },
});
