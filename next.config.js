const {
    withModuleFederation,
    MergeRuntime,
  } = require("@module-federation/nextjs-mf");
  const path = require("path");
  
  module.exports = {
    webpack: (config, options) => {
      const { buildId, dev, isServer, defaultLoaders, webpack } = options;
      const mfConf = {
        name: "app1",
        library: { type: config.output.libraryTarget, name: "app1" },
        filename: "static/runtime/remoteEntry.js",
        remotes: {},
        exposes: {
            './Exposed': './components/Exposed',
            // weird that i need to add the .ts extention
            './add': './lib/add.ts',
            './multiply': './lib/multiply',
        },
        shared: [],
      };
  
      // Configures ModuleFederation and other Webpack properties
      withModuleFederation(config, options, mfConf);
  
      config.plugins.push(new MergeRuntime());
  
      if (!isServer) {
        config.output.publicPath = process.env.PUBLIC_PATH;
      }
  
      return config;
    },
  };