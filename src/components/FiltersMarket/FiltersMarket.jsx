import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useState } from "preact/hooks";

import useGAEventTracker from "../../hooks/use-ga-event-tracker";

import { userAtom, activeFilterTab } from "../../data/atoms";
import countries from "../../data/countries";
import rolesConfig from "../../data/rolesConfig";
import formatNumberSpaces from "../../helpers/formatNumberSpaces";

import CardFlat from "../CardFlat/CardFlat";
import FiltersCheckbox from "../FiltersCheckbox/FiltersCheckbox";
import FiltersDiapazonInputs from "../FiltersDiapazonInputs/FiltersDiapazonInputs";
import FiltersTab from "../FiltersTab/FiltersTab";

import styles from "./filters-market.css";

const FiltersMarket = ({
  className,
  show,
  register,
  onSubmit,
  handleSubmit,
  filterValues,
  watch,
}) => {
  const [currUser] = useAtom(userAtom);
  const [activeTab, setActiveTab] = useAtom(activeFilterTab);
  const [countriesLabeled, setCountriesLabeled] = useState(null);
  const GAEventTrackerFilterTab = useGAEventTracker("Filter Tab Click");

  const openTab = (i) => setActiveTab(i === activeTab ? -1 : i);

  useEffect(() => {
    setCountriesLabeled(
      filterValues?.countries &&
        filterValues?.countries
          .map((c) => {
            const countryFound = countries.find(
              (cL) => cL.code.toLowerCase() === c
            );
            countryFound.code = countryFound.code.toLocaleLowerCase();
            return countryFound;
          })
          .sort((a, b) => (a.label < b.label ? -1 : 1))
    );
  }, [filterValues, filterValues?.countries]);

  return (
    <div id="filters-form-wrapper" className={clsx(styles.wrapper, className)}>
      <form
        id="filters-form"
        className={clsx(styles.form, styles.container, show && styles.show)}
        onInput={handleSubmit(onSubmit)}
        onChange={handleSubmit(onSubmit)}
      >
        <CardFlat id="filters" className={styles.filterTabs}>
          <FiltersTab
            title={
              currUser.role <= rolesConfig.manager ? "??????????????????" : "Category"
            }
            onClick={() => {
              openTab(0);
              currUser.role === rolesConfig.client &&
                GAEventTrackerFilterTab("Category");
            }}
            isOpened={0 === activeTab}
          >
            {!filterValues?.categories?.length && (
              <div className={styles.notification}>
                {currUser.role === rolesConfig.client
                  ? "There are no categories available"
                  : "?????????????????? ????????????????????"}
              </div>
            )}
            {filterValues?.categories &&
              filterValues.categories.map((cat, i) => (
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
              onClick={() => {
                openTab(1);
                currUser.role === rolesConfig.client &&
                  GAEventTrackerFilterTab("Cost");
              }}
              isOpened={1 === activeTab}
            >
              {filterValues?.priceLimits &&
              (filterValues.priceLimits?.min ||
                filterValues.priceLimits?.min === 0) &&
              (filterValues.priceLimits?.max ||
                filterValues.priceLimits?.max === 0) ? (
                <FiltersDiapazonInputs
                  from={filterValues.priceLimits.min}
                  to={filterValues.priceLimits.max}
                  placeholderLeft={formatNumberSpaces(
                    filterValues.priceLimits.min
                  )}
                  placeholderRight={formatNumberSpaces(
                    filterValues.priceLimits.max
                  )}
                  leftRegister={register("costFrom")}
                  rightRegister={register("costTo")}
                  watch={watch}
                  constChar="$"
                />
              ) : (
                <FiltersDiapazonInputs
                  from={"0"}
                  to={"0"}
                  placeholderLeft={"0"}
                  placeholderRight={"0"}
                  leftRegister={register("costFrom")}
                  rightRegister={register("costTo")}
                  watch={watch}
                  constChar="$"
                />
              )}
            </FiltersTab>
          )}
          <FiltersTab
            title={
              currUser.role <= rolesConfig.manager ? "??????????????????" : "Auditorium"
            }
            onClick={() => {
              openTab(2);
              currUser.role === rolesConfig.client &&
                GAEventTrackerFilterTab("Auditorium");
            }}
            isOpened={2 === activeTab}
          >
            {filterValues?.audienceLimits &&
            (filterValues.audienceLimits?.min ||
              filterValues.audienceLimits?.min === 0) &&
            (filterValues.audienceLimits?.max ||
              filterValues.audienceLimits?.max === 0) ? (
              <FiltersDiapazonInputs
                from={filterValues?.audienceLimits?.min}
                to={filterValues?.audienceLimits?.max}
                placeholderLeft={formatNumberSpaces(
                  filterValues?.audienceLimits?.min
                )}
                placeholderRight={formatNumberSpaces(
                  filterValues?.audienceLimits?.max
                )}
                leftRegister={register("audienceFrom")}
                rightRegister={register("audienceTo")}
                watch={watch}
              />
            ) : (
              <FiltersDiapazonInputs
                from={"0"}
                to={"0"}
                placeholderLeft={"0"}
                placeholderRight={"0"}
                leftRegister={register("audienceFrom")}
                rightRegister={register("audienceTo")}
                watch={watch}
              />
            )}
          </FiltersTab>
          <FiltersTab
            title={currUser.role <= rolesConfig.manager ? "????????????" : "Country"}
            onClick={() => {
              openTab(3);
              currUser.role === rolesConfig.client &&
                GAEventTrackerFilterTab("Country");
            }}
            isOpened={3 === activeTab}
          >
            {!countriesLabeled?.length && (
              <div className={styles.notification}>
                {currUser.role === rolesConfig.client
                  ? "There are no countries available"
                  : "???????????? ????????????????????"}
              </div>
            )}
            {countriesLabeled &&
              countriesLabeled.map((country, i) => (
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
};

export default FiltersMarket;
