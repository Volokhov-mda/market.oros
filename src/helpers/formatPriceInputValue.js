import formatNumberSpaces from "./formatNumberSpaces";

const formatPriceInputValue = (prevValue, constChar) => {
    let tempValue = `${prevValue}`;

    tempValue = tempValue?.replace(/[^0-9]/g, "");
    tempValue = tempValue && formatNumberSpaces(tempValue);
    tempValue = (tempValue === constChar) ? "" : tempValue;

    return tempValue ? `${constChar || ""}${tempValue}` : "";
};

export default formatPriceInputValue;