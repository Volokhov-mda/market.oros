const formatNumberSpaces = (number) => {
    if (number === null) return "";
    
    let numFormated = number.toString();

    for (let i = numFormated.length - 1; i > 0; i--) {
        if ((numFormated.length - i + 1) % 4 === 0) {
            numFormated = `${numFormated.substring(0, i)} ${numFormated.substring(i, numFormated.length)}`;
        }
    }

    return numFormated;
};

export default formatNumberSpaces;