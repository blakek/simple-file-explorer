module.exports = async (phase, { defaultConfig }) => {
  /** @type import('next').NextConfig */
  const config = {
    compiler: {
      styledComponents: true,
    },

    // Speed up build by skipping linting and type checking
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };

  return config;
};
