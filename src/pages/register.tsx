import React, {FC} from "react";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";
import {useRegisterMutation} from "../generated/graphql";

//For advanced usage: https://formik.org/docs/api/useFormik
// import {useFormik} from "formik";
/*const formik = useFormik({
    initialValues: {username: "", password: ""},
    onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
    },
})*/

const Register: FC = () => {

    const [, updateRegister] = useRegisterMutation()

    return <Formik initialValues={{username: "", password: ""}}
                   onSubmit={async (props) => {
                                    console.log(props)
                                    const response = await updateRegister(props);
                                    console.log(response.data?.register.user)
                                    console.log(response.data?.register.errors)
                                return response
                                }
                            }
            >
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