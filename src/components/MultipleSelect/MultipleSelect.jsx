import * as React from "react";
import { styled, } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputBase } from '@mui/material';
import { useEffect } from "preact/hooks";

import chevron from "./../../assets/icons/chevron-down-select.svg";

import styles from "./multiple-select.css";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        display: "block",
        position: 'relative',
        backgroundColor: "transparent",
        border: "5px solid #fff",
        borderRadius: 0,
        fontSize: "1rem",
        padding: ".75rem 2.5rem .75rem .75rem !important",
        height: "100%",
        boxSizing: "border-box",
        fontFamily: "var(--font-family)",
        color: "#fff",
        transition: "border-color var(--transition-duration)",
        '&:focus': {
            borderColor: 'var(--accent-color)',
        },
    },
}));

const MultipleSelect = ({ values, valuesSelected, registerProps, }) => {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const { target: { value } } = event;
        let indexOfEmptyValue = value.indexOf("");

        if (value[value.length - 1] === "" || value.length === 0) {
            setPersonName([""]);
        } else {
            indexOfEmptyValue !== -1 && value.splice(indexOfEmptyValue, 1);
            setPersonName(value);
        }
    };

    useEffect(() => {
        setPersonName(valuesSelected?.length ? valuesSelected.map((valueSelected) => valueSelected._id) : [""]);
    }, []);

    const { onChange, ...register } = registerProps;
    return (
        <FormControl style={{ width: "100%", height: "100%" }}>
            <Select
                multiple
                value={personName}
                displayEmpty
                {...register}
                onChange={(e) => { handleChange(e); onChange(e); }}
                input={<BootstrapInput label="Name" />}
                InputLabelProps={{ shrink: false }}
                IconComponent={() => (
                    <img src={chevron} style={{ position: "absolute", right: "1.5rem" }} />
                )}
            >
                <MenuItem
                    value={""}
                    selected={true}
                    style={{ color: "#777" }}
                    className={styles.option}
                >
                    Выбор категории
                </MenuItem>
                {values.map((value, i) =>
                    <MenuItem
                        key={i}
                        value={value._id}
                        className={styles.option}
                    >
                        {value.name}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default MultipleSelect;
