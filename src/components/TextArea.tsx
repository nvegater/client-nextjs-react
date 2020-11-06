import React, {InputHTMLAttributes} from "react";
import {FormControl, Textarea} from "@chakra-ui/core";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import {useField} from "formik";
import FormErrorMessage from "@chakra-ui/core/dist/FormErrorMessage";

type TextAreaProps = InputHTMLAttributes<HTMLInputElement> & { //this makes name required.
    name: string;
    label:string;
}

const TextArea: React.FC<TextAreaProps> = ({label,size:_,...props}) => {

    const [field, {error}] = useField(props)

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Textarea
                id={field.name}
                {...field}
                {...props}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>

    )
}

export default TextArea;