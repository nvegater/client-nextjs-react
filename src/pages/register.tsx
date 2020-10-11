import React, {FC} from "react";
import {Form, Formik, FormikValues} from "formik";
import {FormControl} from "@chakra-ui/core";
import FormLabel from "@chakra-ui/core/dist/FormLabel";
import Input from "@chakra-ui/core/dist/Input";

interface RegisterProps {

}

const Register: FC<RegisterProps> = () => {


    return <Formik initialValues={{username: "", password: ""}} onSubmit={(props: FormikValues) => {
        console.log(props)
    }}>
        {
            (values, handleChange) => (
                <Form>
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            id="username"
                            placeholder="username"
                            value={values.username}
                        />
                        {/*<FormErrorMessage>{form.errors.name}</FormErrorMessage>*/}
                    </FormControl>
                </Form>
            )
        }
    </Formik>
}

export default Register;