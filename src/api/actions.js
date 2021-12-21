export const loginAction = (data) => ({
  method: "POST",
  endpoint: "/auth",
  body: data,
});

export const fetchStatsAction = {
  method: "GET",
  endpoint: "/stats",
};

export const fetchFeedAction = (params) => ({
  method: "GET",
  endpoint: `/feed${params ? "?" : ""}` + 
  `${params.per_page ? `per_page=${params.per_page}` : ""}` + 
  `${params.page ? `&page=${params.page}` : ""}` + 
  `${params.orderby ? `&orderby=${params.orderby}` : ""}` + 
  `${params.order ? `&order=${params.order}` : ""}` + 
  `${params.filter?.categories ? `&filter:influencer.categories.name:in=${params.filter.categories}` : ""}` +
  `${params.filter?.cost?.min ? `&filter:price.amount:gte=${params.filter.cost.min}` : ""}` +
  `${params.filter?.cost?.max ? `&filter:price.amount:lte=${params.filter.cost.max}` : ""}` +
  `${params.filter?.audience?.min ? `&filter:influencer.meta.audience:gte=${params.filter.audience.min}` : ""}` +
  `${params.filter?.audience?.max ? `&filter:influencer.meta.audience:lte=${params.filter.audience.max}` : ""}` +
  `${params.filter?.countries ? `&filter:influencer.countries:in=${params.filter.countries}` : ""}`,
  config: {
    needsToken: true,
  },
});

export const fetchInfluencersSummaryAction = {
  method: "GET",
  endpoint: "/influencers/summary",
  config: {
    needsToken: true,
  },
};

export const fetchArchiveInfluencersSummaryAction = {
  method: "GET",
  endpoint: "/influencers/archive/summary",
  config: {
    needsToken: true,
  },
};

export const archiveInfluencerAction = (id) => ({
  method: "POST",
  endpoint: `/influencers/${id}/archive`,
  config: {
    needsToken: true,
  },
});

export const restoreInfluencerAction = (id) => ({
  method: "POST",
  endpoint: `/influencers/${id}/restore`,
  config: {
    needsToken: true,
  },
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

export const fetchCurrentUserAction = {
  method: "GET",
  endpoint: "/users/current",
  config: {
    needsToken: true,
  },
};

export const fetchInfluencersAction = (params) => ({
  method: "GET",
  endpoint: `/influencers${params ? "?" : ""}` + 
    `${params.per_page ? `per_page=${params.per_page}` : ""}` + 
    `${params.page ? `&page=${params.page}` : ""}` + 
    `${params.orderby ? `&orderby=${params.orderby}` : ""}` + 
    `${params.order ? `&order=${params.order}` : ""}` + 
    `${params.filter?.categories ? `&filter:categories.name:in=${params.filter.categories}` : ""}` +
  `${params.filter?.audience?.min ? `&filter:meta.audience:gte=${params.filter.audience.min}` : ""}` +
  `${params.filter?.audience?.max ? `&filter:meta.audience:lte=${params.filter.audience.max}` : ""}` +
  `${params.filter?.countries ? `&filter:countries:in=${params.filter.countries}` : ""}`,
  config: {
    needsToken: true,
  },
});

export const fetchArchiveInfluencersAction = (params) => ({
  method: "GET",
  endpoint: `/influencers/archive${params ? "?" : ""}` + 
  `${params.per_page ? `per_page=${params.per_page}` : ""}` + 
  `${params.page ? `&page=${params.page}` : ""}` + 
  `${params.orderby ? `&orderby=${params.orderby}` : ""}` + 
  `${params.order ? `&order=${params.order}` : ""}` + 
  `${params.filter?.categories ? `&filter:categories.name:in=${params.filter.categories}` : ""}` +
  `${params.filter?.audience?.min ? `&filter:meta.audience:gte=${params.filter.audience.min}` : ""}` +
  `${params.filter?.audience?.max ? `&filter:meta.audience:lte=${params.filter.audience.max}` : ""}` +
  `${params.filter?.countries ? `&filter:countries:in=${params.filter.countries}` : ""}`,
  config: {
    needsToken: true,
  },
});

export const fetchUsers = {
  method: "GET",
  endpoint: "/users",
  config: {
    needsToken: true,
  },
};
export const fetchUserAction = (id) => ({
  method: "GET",
  endpoint: `/users/${id}`,
  config: {
    needsToken: true,
  },
});

export const fetchArchiveUsers = {
  method: "GET",
  endpoint: "/users/archive",
  config: {
    needsToken: true,
  },
};

export const fetchCategoriesAction = {
  method: "GET",
  endpoint: "/categories",
  config: {
    needsToken: true,
  },
};

export const createCategoryAction = (data) => ({
  method: "POST",
  endpoint: "/categories",
  body: data,
  config: {
    needsToken: true,
  },
});

export const editCategoryAction = (id, data) => ({
  method: "PATCH",
  endpoint: `/categories/${id}`,
  body: data,
  config: {
    needsToken: true,
  },
});

export const deleteCategoryAction = (id) => ({
  method: "DELETE",
  endpoint: `/categories/${id}`,
  config: {
    needsToken: true,
  },
});

export const fetchSubscriptions = (params) => ({
  method: "GET",
  endpoint: `/subscriptions${params ? "?" : ""}` + 
  `${params.per_page ? `per_page=${params.per_page}` : ""}` + 
  `${params.page ? `&page=${params.page}` : ""}` + 
  `${params.orderby ? `&orderby=${params.orderby}` : ""}` + 
  `${params.order ? `&order=${params.order}` : ""}` + 
  `${params.filter?.categories ? `&filter:categories.name:in=${params.filter.categories}` : ""}`,
  config: {
    needsToken: true,
  },
});

export const fetchSubscriptionsSummaryAction = {
  method: "GET",
  endpoint: "/subscriptions/summary",
  config: {
    needsToken: true,
  },
};

export const addSubscriptionAction = (data) => ({
  method: "POST",
  endpoint: "/subscriptions",
  body: data,
  config: {
    needsToken: true,
  },
});

export const fetchInfluencerSubscriptionsAction = (id) => ({
  method: "GET",
  endpoint: `/subscriptions/${id}`,
  config: {
    needsToken: true,
  },
});

export const editSubscriptionAction = (id, data) => ({
  method: "PATCH",
  endpoint: `/subscriptions/${id}`,
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
  method: "POST",
  endpoint: `/influencers/reorder`,
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
