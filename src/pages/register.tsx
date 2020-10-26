import React, {FC} from "react";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";
import {useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";
import RegisterResponsiveContainer from "../components/Wrapper";

const Register: FC = () => {

    const router = useRouter();

    const [, register] = useRegisterMutation()

    return <RegisterResponsiveContainer>
        <Formik initialValues={{username: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register(values);

                    if (response.data?.register.errors) {
                        // response.data.register.errors --> Return err if data is undefined
                        // response.data?.register.errors --> Return undefined if data is undefined.
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        router.push("/")
                    }
                }
                }
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <InputField label="Username" name="username" placeholder="username"/>
                        <InputField label="Password" name="password" placeholder="password" type="password"/>
                        <Button type="submit" isLoading={isSubmitting} m={5}>Register</Button>
                    </Form>
                )
            }
        </Formik>
    </RegisterResponsiveContainer>
}

export default Register;