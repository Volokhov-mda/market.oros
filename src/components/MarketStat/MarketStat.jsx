import style from "./market-stat.css";

const MarketStat = ({ number, title }) => {
    const formatNumber = (number) => {
        let numFormated = number.toString();

        for (let i = numFormated.length - 1; i > 0; i--) {
            if ((numFormated.length - i + 1) % 4 === 0) {
                numFormated = `${numFormated.substring(0, i)} ${numFormated.substring(i, numFormated.length)}`;
            }
        }

        return numFormated;
    };

    return (
        <div className={style.container}>
            <div className={style.number}>{formatNumber(number)}</div>
            <div>{title}</div>
        </div>
    );
}

export default MarketStat;