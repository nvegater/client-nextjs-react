import React, {InputHTMLAttributes} from "react";
import {FormControl} from "@chakra-ui/core";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import Input from "@chakra-ui/core/dist/Input";
import {useField} from "formik";
import FormErrorMessage from "@chakra-ui/core/dist/FormErrorMessage";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & { //this makes name required.
    name: string;
    label:string;
}

const InputField: React.FC<InputFieldProps> = ({label,size:_,...props}) => {

    const [field, {error}] = useField(props)

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input
                id={field.name}
                {...field}
                {...props}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>

    )
}

export default InputField;