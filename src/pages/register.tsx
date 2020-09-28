import React, {FC} from "react";
import {Field, Formik} from "formik";
import {Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/core";

interface RegisterProps {

}

const Register: FC<RegisterProps> = () => {
    
    let handleSubmit = (values, actions) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
    };
    return <Formik onSubmit={handleSubmit} initialValues={{name: "Insert something"}}>
        {
            props => (
                <form onSubmit={props.handleSubmit}>
                    <Field name="name">
                        {({field, form}) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel htmlFor="name">First name</FormLabel>
                                <Input {...field} id="name" placeholder="name"/>
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Button
                        mt={4}
                        variantColor="teal"
                        isLoading={props.isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            )}
    </Formik>
}

export default Register;