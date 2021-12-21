import { forwardRef } from 'preact/compat';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "preact/hooks";
import clsx from 'clsx';

import countries from '../../data/countries';

import mergeRefs from '../../helpers/mergeRefs';

import Input from '../Input/Input';

import styles from "./autocomplete-input-country.css";

const AutocompleteInputCountry = forwardRef(({ className, readOnly, placeholder, ...props }, ref) => {
    const [currCountryCode, setCurrCountryCode] = useState(null);

    return (
        <Autocomplete
            className={styles.autocomplete}
            options={[{ label: "Нет", code: "", }, ...countries]}
            noOptionsText={<div className={styles.noOption}>Нет стран</div>}
            autoHighlight
            getOptionLabel={(option) => `${option.label} ${option.code && `(${option.code.toLowerCase()})`}`}
            renderOption={(propsAutocomplete, option) => {
                const { className: propsAutocompleteClassName, onClick, ...newPropsAutocomplete } = propsAutocomplete;

                newPropsAutocomplete.key = option.label;


                return (
                    <div className={clsx(styles.option, propsAutocompleteClassName)} {...newPropsAutocomplete} onClick={(e) => { onClick(e); setCurrCountryCode(option.code.toLowerCase()); }}>
                        {option.code && (
                            <img
                                className={styles.flagIcon}
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                alt={option.code}
                            />
                        )}
                        {option.label} {option.code && `(${option.code.toLowerCase()})`}
                    </div>
                );
            }}
            renderInput={(params) => {
                const { ref: refInputProps, onChange: onChangeInputProps, onBlur: onBlurInputProps, className: classNameInputProps, ...inputProps } = params.inputProps;
                const { onChange: onChangeRegister, onBlur: onBlurRegister, ...registerProps } = props;
                const mergedRef = mergeRefs(refInputProps, ref);

                return (
                    <div ref={params.InputProps.ref}>
                        <Input
                            className={clsx(className, classNameInputProps)}
                            placeholder={placeholder}
                            onChange={readOnly ? () => {} : (e) => { onChangeInputProps(e); onChangeRegister(e); }}
                            onBlur={readOnly ? () => {} : (e) => { onBlurInputProps(e); onBlurRegister(e); }}
                            {...(!readOnly && inputProps)}
                            {...(!readOnly && registerProps)}
                            ref={mergedRef}
                            value={currCountryCode}
                            type="text"
                            autocomplete="new-password"
                            readOnly={readOnly}
                        />
                    </div>
                )
            }}
        />
    );
});

export default AutocompleteInputCountry;
