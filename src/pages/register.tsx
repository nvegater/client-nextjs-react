import React, {FC} from "react";
import {Form, Formik, FormikValues} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";

//For advanced usage: https://formik.org/docs/api/useFormik
// import {useFormik} from "formik";
    /*const formik = useFormik({
        initialValues: {username: "", password: ""},
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    })*/

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