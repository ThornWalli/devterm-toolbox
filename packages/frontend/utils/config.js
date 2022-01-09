export const MAX_IMAGE_WIDTH = 512;

export const getDefaultConfig = () => {
  return {
    theme: 'amber',
    startType: null,
    ssl: {
      key: null,
      cert: null,
      pfx: null,
      passphrase: null
    },
    profiles: []
  };
};

export const getDefaultProfile = () => {
  return {
    name: null,
    port: 3000,
    host: null,
    secure: false,
    ssl: {
      key: null,
      cert: null,
      pfx: null,
      passphrase: null
    }
  };
};
