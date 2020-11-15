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
        // here I was just playing around with the different export options in terms of path;
        // first and second use an alias from tsconfig, third is a regular relative path
        exposes: {
            './Exposed': '@/components/Exposed',
            './add': 'lib/add',
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