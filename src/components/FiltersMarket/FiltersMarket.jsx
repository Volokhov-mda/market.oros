import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useState } from "preact/hooks";

import { userAtom } from "../../data/atoms";
import countries from "../../data/countries";
import rolesConfig from "../../data/rolesConfig";
import formatNumberSpaces from "../../helpers/formatNumberSpaces";

import CardFlat from "../CardFlat/CardFlat";
import FiltersCheckbox from "../FiltersCheckbox/FiltersCheckbox";
import FiltersDiapazonInputs from "../FiltersDiapazonInputs/FiltersDiapazonInputs";
import FiltersTab from "../FiltersTab/FiltersTab";

import styles from "./filters-market.css";

const FiltersMarket = ({ className, show, register, onSubmit, handleSubmit, filterValues, watch, }) => {
    const [currUser] = useAtom(userAtom);
    const [active, setActive] = useState(null);
    const [countriesLabeled, setCountriesLabeled] = useState(null);

    const openTab = (i) => setActive(i === active ? -1 : i);

    useEffect(() => {
        setCountriesLabeled(filterValues?.countries && filterValues?.countries
            .map((c) => {
                const countryFound = countries.find((cL) => cL.code.toLowerCase() === c);
                countryFound.code = countryFound.code.toLocaleLowerCase();
                return countryFound;
            })
            .sort((a, b) => (a.label < b.label) ? -1 : 1)
        );
    }, [filterValues, filterValues?.countries]);

    return (
        <div className={clsx( styles.wrapper, className)}>
            <form id="filters-form" className={clsx(styles.form, styles.container, show && styles.show)} onInput={handleSubmit(onSubmit)} onChange={handleSubmit(onSubmit)}>
                <CardFlat id="filters" className={styles.filterTabs}>
                    <FiltersTab
                        title={(currUser.role <= rolesConfig.manager) ? "Категория" : "Category"}
                        onClick={() => openTab(0)}
                        isOpened={0 === active}
                    >
                        {!filterValues?.categories?.length && <div className={styles.notification}>Категории отсутсвуют</div>}
                        {filterValues?.categories && filterValues.categories.map((cat, i) => (
                            <FiltersCheckbox
                                key={i}
                                value={cat.name}
                                {...register("category")}
                                onInput={(e) => e.stopPropagation()}
                            >
                                {cat.name}
                            </FiltersCheckbox>
                        ))}
                    </FiltersTab>
                    {!(currUser.role <= rolesConfig.manager || !currUser.showPrices) && (
                        <FiltersTab
                            title={"Cost"}
                            onClick={() => openTab(1)}
                            isOpened={1 === active}
                        >
                            <FiltersDiapazonInputs
                                from={filterValues?.priceLimits ? filterValues.priceLimits.min : "0"}
                                to={filterValues?.priceLimits ? filterValues.priceLimits.max : "0"}
                                placeholderLeft={filterValues?.priceLimits ? formatNumberSpaces(filterValues.priceLimits.min) : "0"}
                                placeholderRight={filterValues?.priceLimits ? formatNumberSpaces(filterValues.priceLimits.max) : "0"}
                                leftRegister={register("costFrom")}
                                rightRegister={register("costTo")}
                                watch={watch}
                                constChar="$"
                            />
                        </FiltersTab>
                    )}
                    <FiltersTab
                        title={(currUser.role <= rolesConfig.manager) ? "Аудитория" : "Auditorium"}
                        onClick={() => openTab(2)}
                        isOpened={2 === active}
                    >
                        <FiltersDiapazonInputs
                            from={filterValues?.audienceLimits ? filterValues.audienceLimits.min : "0"}
                            to={filterValues?.audienceLimits ? filterValues.audienceLimits.max : "0"}
                            placeholderLeft={filterValues?.audienceLimits ? formatNumberSpaces(filterValues.audienceLimits.min) : "0"}
                            placeholderRight={filterValues?.audienceLimits ? formatNumberSpaces(filterValues.audienceLimits.max) : "0"}
                            leftRegister={register("audienceFrom")}
                            rightRegister={register("audienceTo")}
                            watch={watch}
                        />
                    </FiltersTab>
                    <FiltersTab
                        title={(currUser.role <= rolesConfig.manager) ? "Страна" : "Country"}
                        onClick={() => openTab(3)}
                        isOpened={3 === active}
                    >
                        {!countriesLabeled?.length && <div className={styles.notification}>Страны отсутсвуют</div>}
                        {countriesLabeled && countriesLabeled.map((country, i) => (
                            <FiltersCheckbox
                                key={i}
                                value={country.code}
                                {...register("country")}
                                onInput={(e) => e.stopPropagation()}
                            >
                                {country.label}
                            </FiltersCheckbox>
                        ))}
                    </FiltersTab>
                </CardFlat>
            </form>
        </div>
    );
}

export default FiltersMarket;