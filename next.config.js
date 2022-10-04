module.exports = async (phase, { defaultConfig }) => {
  /** @type import('next').NextConfig */
  const config = {
    compiler: {
      styledComponents: true,
    },
  };

  return config;
};
