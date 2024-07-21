import { useState } from "react";

export default function useInputValidation(initialValue, name) {

    let errorText;
    switch (name) {
        case 'email':
            errorText = "Email field cannot be empty";
            break;
        case 'password':
            errorText = "Password field cannot be empty";
            break;
        default:
            errorText = "This field cannot be empty";
            break;
    }

    const [value, setValue] = useState(initialValue);
    const [isUsed, setIsUsed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(errorText);

    function validation(name, value, setError) {
        switch (name) {
            case 'email':
                var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                if (!re.test(String(value).toLowerCase())) {
                    setError("Invalid email");
                    if (!value) {
                        setError("Email field cannot be empty");
                    }
                } else {
                    setError("");
                }
                break;
            case 'password':
                if (value.length < 4 || value.length > 18) {
                    setError("Password must contain between 4 and 18 characters");
                    if (!value) {
                        setError("Password field cannot be empty");
                    }
                } else {
                    setError("");
                }
                break;
            default:
                if (!value) {
                    setError("This field cannot be empty");
                } else {
                    setError("");
                }
        }
    }

    function onChange(e) {
        setValue(e.target.value);
        validation(e.target.name, e.target.value, setErrorMessage);
    }

    function onBlur(e) {
        setIsUsed(true);
    }

    return [value, setValue, isUsed, onChange, onBlur, errorMessage];
}