import clsx from "clsx";
import { useState } from "preact/hooks";
import { useForm } from "react-hook-form";

import CardFlat from "../CardFlat/CardFlat";
import FiltersCheckbox from "../FiltersCheckbox/FiltersCheckbox";
import FiltersDiapazonInputs from "../FiltersDiapazonInputs/FiltersDiapazonInputs";
import FiltersTab from "../FiltersTab/FiltersTab";

import styles from "./filters-market.css";

const cats = [
    { title: 'Аниме' },
    { title: 'Онимэ' },
    { title: 'Анимешник' },
];
const countries = [
    { title: 'Россия' },
    { title: 'РФ' },
    { title: 'Российская Федерация' },
    { title: 'Русь' },
];

const FiltersMarket = ({ show }) => {
    const [active, setActive] = useState(null);
    const { register, handleSubmit, watch, setValue, reset } = useForm();

    const openTab = (i) => setActive(i === active ? -1 : i);

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <CardFlat id="filters" className={clsx(styles.container, show && styles.show)}>
                    <FiltersTab
                        title={"Категория"}
                        onClick={() => openTab(0)}
                        isOpened={0 === active}
                    >
                        {cats.map((cat, i) => (
                            <FiltersCheckbox
                                key={i}
                                {...register(cat.title)}
                            >
                                {cat.title}
                            </FiltersCheckbox>
                        ))}
                    </FiltersTab>
                    <FiltersTab
                        title={"Стоимость"}
                        onClick={() => openTab(1)}
                        isOpened={1 === active}
                    >
                        <FiltersDiapazonInputs
                            placeholderLeft="$0"
                            placeholderRight="$10000"
                        />
                    </FiltersTab>
                    <FiltersTab
                        title={"Аудитория"}
                        onClick={() => openTab(2)}
                        isOpened={2 === active}
                    >
                        <FiltersDiapazonInputs
                            placeholderLeft="0"
                            placeholderRight="20000"
                        />
                    </FiltersTab>
                    <FiltersTab
                        title={"Страна"}
                        onClick={() => openTab(3)}
                        isOpened={3 === active}
                    >
                        {countries.map((country, i) => (
                            <FiltersCheckbox
                                key={i}
                                {...register(country.title)}
                            >
                                {country.title}
                            </FiltersCheckbox>
                        ))}
                    </FiltersTab>
                </CardFlat>
            </form>
        </div>
    );
}

export default FiltersMarket;