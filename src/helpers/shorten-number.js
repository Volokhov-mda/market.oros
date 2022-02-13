const shortenNumber = (number) => {
    const roundOneDecimalDigit = (number) => Math.round(number * 10) / 10;

    if (number / 1_000.0 < 1) {
        return number;
    }

    if (number / 1_000_000.0 < 1) {
        return `${roundOneDecimalDigit(number / 1_000.0)}K`;
    }

    return `${roundOneDecimalDigit(number / 1_000_000.0)}M`;
};

export default shortenNumber;