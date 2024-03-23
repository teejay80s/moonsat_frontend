import React from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { getRegExp, getSentenceFromCamelCase } from "./Helpers";

const Input = ({
	checked,
	className,
	disabled,
	error,
	fixLength,
	required,
	label,
	minLength,
	maxLength,
	name,
	onChange,
	placeholder,
	reqType,
	style,
	type,
	validationHandler,
	value,
	size,
	labelClassName,
}) => {
	const onChangeHandler = (event) => {
		const { name, value, type, checked } = event.target;
		const inputValue = type === "checkbox" ? checked : value;
		onChange && onChange(name, inputValue);
	};

	const onValidationChange = (event) => {
		if (!validationHandler) return;
		const { value } = event.target;
		let errorMessage = "";
		if (!value && required) {
			errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
		} else if (minLength && value.length < minLength) {
			errorMessage = `${
				name.charAt(0).toUpperCase() +
				getSentenceFromCamelCase(name).slice(1)
			} must be at least ${minLength} characters long.`;
		} else if (maxLength && value.length > maxLength) {
			errorMessage = `${
				name.charAt(0).toUpperCase() +
				getSentenceFromCamelCase(name).slice(1)
			} must be ${minLength} characters long.`;
		} else if (fixLength && value.length !== fixLength) {
			errorMessage = `${
				name.charAt(0).toUpperCase() +
				getSentenceFromCamelCase(name).slice(1)
			} must be ${fixLength} characters.`;
		} else if (value && reqType && !getRegExp(reqType).test(value)) {
			errorMessage = `Please enter valid ${getSentenceFromCamelCase(
				name
			)}.`;
		}
		validationHandler(name, errorMessage);
	};
	return (
		<div className={`${styles.InputContainer} ${styles[size]}`}>
			<label htmlFor={name} className={labelClassName}>
				{label}
				{required && <span className={styles.required}>&nbsp;*</span>}
				{error ? (
					<span className={`${styles.required} ${styles.textSmall}`}>
						{error}
					</span>
				) : null}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				value={value}
				checked={checked}
				placeholder={placeholder}
				className={`${styles.blackBorder} ${className}`}
				required={required}
				style={style}
				disabled={disabled}
				onChange={onChangeHandler}
				onBlur={onValidationChange}
			/>
		</div>
	);
};

Input.defaultProps = {
	checked: false,
	className: "",
	disabled: false,
	error: "",
	fixLength: 0,
	required: false,
	label: "",
	minLength: 0,
	maxLength: 0,
	placeholder: "",
	reqType: "",
	style: {},
	type: "text",
	validationHandler: () => {},
	size: "medium",
	labelClassName: styles.labelBlack,
	value: "",
};

Input.propTypes = {
	checked: PropTypes.bool,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	error: PropTypes.string,
	fixLength: PropTypes.number,
	required: PropTypes.bool,
	label: PropTypes.string.isRequired,
	minLength: PropTypes.number,
	maxLength: PropTypes.number,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	reqType: PropTypes.string,
	style: PropTypes.object,
	type: PropTypes.string,
	validationHandler: PropTypes.func,
	value: PropTypes.any.isRequired,
	size: PropTypes.string,
	labelClassName: PropTypes.string,
};

export default Input;
