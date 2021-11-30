import styles from "./page-wrapper.css";

const PageWrapper = ({ title, ...props }) => {
    return (
        <>
            <h2 style={{fontSize: "1.5rem", marginBottom: ".8rem"}}>{title}</h2>
            {props.children}
        </>
    );
}

export default PageWrapper;