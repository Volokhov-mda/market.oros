import showError from "../helpers/show-error";

export const requestHostInterceptor = (host) => () => async (action) => ({
  ...action,
  endpoint: `${host}${action.endpoint}`,
});

export const requestTokenInterceptor = () => async (action) => {
  if (!action?.config?.needsToken) return action;
  const token = localStorage.getItem("token");

  return {
    ...action,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const responseErrorInterceptor = () => async (action, response) => {
  response.error && showError(response.payload);
  return response;
};
