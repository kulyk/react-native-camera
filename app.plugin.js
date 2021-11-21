const { AndroidConfig, createRunOncePlugin, withInfoPlist } = require('@expo/config-plugins');

const pkg = require('react-native-camera/package.json');

const DEFAULT_CAMERA_USAGE_DESCRIPTION = 'Allow $(PRODUCT_NAME) to access the camera';

/**
 * Adds permissions to Info.plist
 */
const withIosPermissions = (config, { cameraPermission } = {}) => {
  return withInfoPlist(config, (_config) => {
    if (cameraPermission !== false) {
      _config.modResults.NSCameraUsageDescription =
        cameraPermission ||
        _config.modResults.NSCameraUsageDescription ||
        DEFAULT_CAMERA_USAGE_DESCRIPTION;
    }
    return _config;
  });
};

/**
 * Adds permissions the AndroidManifest
 */
const withAndroidPermissions = (config) => {
  return AndroidConfig.Permissions.withPermissions(config, ['android.permission.CAMERA']);
};

const withCamera = (config, props = {}) => {
  const _props = props ? props : {};
  config = withIosPermissions(config, _props);
  if (_props.microphonePermission !== false) {
    config = withAndroidPermissions(config);
  }
  return config;
};

module.exports = createRunOncePlugin(withCamera, pkg.name, pkg.version);
