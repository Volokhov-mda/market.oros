export const loginAction = (data) => ({
  method: "POST",
  endpoint: "/auth",
  body: data,
});

export const deleteInfluencerAction = (id) => ({
  method: "DELETE",
  endpoint: `/influencers/${id}`,
  config: {
    needsToken: true,
  },
});

export const fetchInfluencerAction = (id) => ({
  method: "GET",
  endpoint: `/influencers/${id}`,
  config: {
    needsToken: true,
  },
});

export const fetchInfluencerPricesAction = (id) => ({
  method: "GET",
  endpoint: `/influencers/${id}/prices`,
  config: {
    needsToken: true,
  },
});

export const fetchTargetPricesAction = {
  method: "GET",
  endpoint: "/users/current/prices",
  config: {
    needsToken: true,
  },
};

export const fetchAllPrices = {
  method: "GET",
  endpoint: "/prices",
  config: {
    needsToken: true,
  },
};

export const fetchUserAction = {
  method: "GET",
  endpoint: "/users/current",
  config: {
    needsToken: true,
  },
};

export const fetchInfluencersAction = {
  method: "GET",
  endpoint: "/influencers",
  config: {
    needsToken: true,
  },
};

export const fetchUsers = {
  method: "GET",
  endpoint: "/users",
  config: {
    needsToken: true,
  },
};

export const addPriceAction = (data) => ({
  method: "POST",
  endpoint: "/prices",
  body: data,
  config: {
    needsToken: true,
  },
});

export const banUserAction = (id) => ({
  method: "POST",
  endpoint: `/users/${id}/ban`,
  config: {
    needsToken: true,
  },
});

export const restoreUserAction = (id) => ({
  method: "POST",
  endpoint: `/users/${id}/unban`,
  config: {
    needsToken: true,
  },
});

export const createUserAction = (data) => ({
  method: "POST",
  endpoint: "/users",
  body: data,
  config: {
    needsToken: true,
  },
});

export const editUserAction = (id, data) => ({
  method: "PATCH",
  endpoint: `/users/${id}`,
  body: data,
  config: {
    needsToken: true,
  },
});

export const editInfluencerAction = (id, data) => ({
  method: "PATCH",
  endpoint: `/influencers/${id}`,
  body: data,
  config: {
    needsToken: true,
  },
});

export const reorderInfluencersAction = (data) => ({
  method: "PATCH",
  endpoint: `/influencers/reorder`,
  body: data,
  config: {
    needsToken: true,
  },
});

export const editPriceAction = (id, data) => ({
  method: "PATCH",
  endpoint: `/prices/${id}`,
  body: data,
  config: {
    needsToken: true,
  },
});

export const addInfluencerAction = (data) => ({
  method: "POST",
  endpoint: `/influencers`,
  body: data,
  config: {
    needsToken: true,
  },
});
