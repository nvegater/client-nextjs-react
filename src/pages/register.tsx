import React, {FC} from "react";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";
import {useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";

const Register: FC = () => {

    const [, register] = useRegisterMutation()

    return <Formik initialValues={{username: "", password: ""}}
                   onSubmit={async (values, {setErrors}) => {
                           const response = await register(values);
                           if (response.data?.register.errors){
                               setErrors(toErrorMap(response.data.register.errors))
                           }
                       }
                   }
    >
        {
            ({isSubmitting}) => (
                <Form>
                    <InputField label="Username" name="username" placeholder="username"/>
                    <InputField label="Password" name="password" placeholder="password" type="password"/>
                    <Button type="submit" color="teal" isLoading={isSubmitting} m={5}>Register</Button>
                </Form>
            )
        }
    </Formik>
}

export default Register;