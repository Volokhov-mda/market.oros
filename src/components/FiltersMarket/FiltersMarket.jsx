import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";

import countries from "../../data/countries";

import CardFlat from "../CardFlat/CardFlat";
import FiltersCheckbox from "../FiltersCheckbox/FiltersCheckbox";
import FiltersDiapazonInputs from "../FiltersDiapazonInputs/FiltersDiapazonInputs";
import FiltersTab from "../FiltersTab/FiltersTab";

import styles from "./filters-market.css";

const FiltersMarket = ({ show, register, onSubmit, handleSubmit, filterValues }) => {
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
        <div className={styles.wrapper}>
            <form className={styles.form} onChange={handleSubmit(onSubmit)}>
                <CardFlat id="filters" className={clsx(styles.container, show && styles.show)}>
                    <FiltersTab
                        title={"Категория"}
                        onClick={() => openTab(0)}
                        isOpened={0 === active}
                    >
                        {!filterValues?.categories?.length && <div className={styles.notification}>Категории отсутсвуют</div>}
                        {filterValues?.categories && filterValues.categories.map((cat, i) => (
                            <FiltersCheckbox
                                key={i}
                                value={cat.name}
                                {...register("category")}
                            >
                                {cat.name}
                            </FiltersCheckbox>
                        ))}
                    </FiltersTab>
                    <FiltersTab
                        title={"Стоимость"}
                        onClick={() => openTab(1)}
                        isOpened={1 === active}
                    >
                        <FiltersDiapazonInputs
                            from={filterValues?.priceLimits ? filterValues.priceLimits.min : "0"}
                            to={filterValues?.priceLimits ? filterValues.priceLimits.max : "0"}
                            placeholderLeft={filterValues?.priceLimits ? `$${filterValues.priceLimits.min}` : "0"}
                            placeholderRight={filterValues?.priceLimits ? `$${filterValues.priceLimits.max}` : "0"}
                            leftRegister={register("costFrom")}
                            rightRegister={register("costTo")}
                        />
                    </FiltersTab>
                    <FiltersTab
                        title={"Аудитория"}
                        onClick={() => openTab(2)}
                        isOpened={2 === active}
                    >
                        <FiltersDiapazonInputs
                            from={filterValues?.audienceLimits ? filterValues.audienceLimits.min : "0"}
                            to={filterValues?.audienceLimits ? filterValues.audienceLimits.max : "0"}
                            placeholderLeft={filterValues?.audienceLimits ? filterValues.audienceLimits.min : "0"}
                            placeholderRight={filterValues?.audienceLimits ? filterValues.audienceLimits.max : "0"}
                            leftRegister={register("audienceFrom")}
                            rightRegister={register("audienceTo")}
                        />
                    </FiltersTab>
                    <FiltersTab
                        title={"Страна"}
                        onClick={() => openTab(3)}
                        isOpened={3 === active}
                    >
                        {!countriesLabeled?.length && <div className={styles.notification}>Страны отсутсвуют</div>}
                        {countriesLabeled && countriesLabeled.map((country, i) => (
                            <FiltersCheckbox
                                key={i}
                                value={country.code}
                                {...register("country")}
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