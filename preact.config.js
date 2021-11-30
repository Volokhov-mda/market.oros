import envVars from "preact-cli-plugin-env-vars";

export default (config, env, helpers) => {
  delete config.node;
  if (env.isProd) config.devtool = false;

  envVars(config, env, helpers);
};
