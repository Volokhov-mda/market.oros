const formatFilterParams = (page, per_page, data) => ({
    page,
    per_page,
    orderby: data?.orderby,
    order: data?.order,
    filter: {
        categories: (data?.category.length === 0 || !data?.category) ? undefined : data?.category.join(","),
        cost: {
            min: data?.costFrom,
            max: data?.costTo,
        },
        audience: {
            min: data?.audienceFrom,
            max: data?.audienceTo,
        },
        countries: (data?.country.length === 0 || !data?.country) ? undefined : data?.country.join(","),
    },
}
);

export default formatFilterParams;