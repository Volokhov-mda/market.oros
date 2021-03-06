const shortenNumber = (number) => {
    const replacePointOnComma = (str) => str.toString().replace(".", ",");

    const roundOneDecimalDigit = (number) => Math.round(number * 10) / 10;

    if (number / 1_000.0 < 1) {
        return number;
    }

    if (number / 1_000_000.0 < 1) {
        return replacePointOnComma(`${roundOneDecimalDigit(number / 1_000.0)}K`);
    }

    return replacePointOnComma(`${roundOneDecimalDigit(number / 1_000_000.0)}M`);
};

export default shortenNumber;