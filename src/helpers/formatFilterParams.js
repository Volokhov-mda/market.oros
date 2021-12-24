const formatFilterParams = (page, per_page, data) => ({
    page,
    per_page,
    orderby: data?.orderby,
    order: data?.order,
    filter: {
        categories: (!data?.category || data?.category.length === 0) ? undefined : data?.category.join(","),
        cost: {
            min: data?.costFrom?.replace(/[\$ ]/g, ""),
            max: data?.costTo?.replace(/[\$ ]/g, ""),
        },
        audience: {
            min: data?.audienceFrom,
            max: data?.audienceTo,
        },
        countries: (!data?.country || data?.country.length === 0) ? undefined : data?.country.join(","),
    },
}
);

export default formatFilterParams;