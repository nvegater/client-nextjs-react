import React, {FC} from "react";
import {Field, Formik} from "formik";
import {Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/core";

interface RegisterProps {

}

const Register: FC<RegisterProps> = () => {
    
    let handleSubmit = (props) => {
        setTimeout(() => {
            alert(JSON.stringify(props.values, null, 2));
            // actions has callbacks to influence the form
            props.actions.setSubmitting(false);
        }, 1000);
    };
    return <Formik initialValues={{name: "Insert something"}} onSubmit={handleSubmit}>
            {
                    ({
                     handleSubmit,
                     isSubmitting
                    }) => (
                    <form onSubmit={handleSubmit}>
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
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                )}
    </Formik>
}

export default Register;