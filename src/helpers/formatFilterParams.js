const formatFilterParams = (page, per_page, data) => (
    {
        page,
        per_page,
        orderby: data?.orderby,
        order: data?.order,
        filter: {
            categories: (!data?.category || data?.category.length === 0) ? undefined : (Array.isArray ? data?.category.join(",") : data?.category),
            cost: {
                min: data?.costFrom?.replace(/[\$ ]/g, ""),
                max: data?.costTo?.replace(/[\$ ]/g, ""),
            },
            audience: {
                min: data?.audienceFrom?.replace(/[\$ ]/g, ""),
                max: data?.audienceTo?.replace(/[\$ ]/g, ""),
            },
            countries: (!data?.country || data?.country.length === 0) ? undefined : (Array.isArray ? data?.country.join(",") : data?.country),
        },
    }
);

export default formatFilterParams;