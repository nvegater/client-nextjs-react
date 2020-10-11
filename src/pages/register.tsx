import React, {FC} from "react";
import {Form, Formik, FormikValues} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";

interface RegisterProps {

}

const Register: FC<RegisterProps> = () => {


    return <Formik initialValues={{username: "", password: ""}} onSubmit={(props: FormikValues) => {
        console.log(props)
    }}>
        {
            ({isSubmitting}) => (
                <Form>
                    <InputField label="Username" name="username"/>
                    <InputField label="Password" name="password" type="password"/>
                    <Button type="submit" color="teal" isLoading={isSubmitting} m={5}>Register</Button>
                </Form>
            )
        }
    </Formik>
}

export default Register;