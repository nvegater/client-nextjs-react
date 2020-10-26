import React, {FC} from "react";
import {Form, Formik} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";
import {useRouter} from "next/router";
import FormResponsiveContainer from "../components/FormResponsiveContainer";
import {useLoginMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";

const Register: FC = () => {

    const router = useRouter();

    const [, login]  = useLoginMutation()


    return <FormResponsiveContainer>
        <Formik initialValues={{username: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login({options:values});
                    response.data?.login.errors
                        ? setErrors(toErrorMap(response.data.login.errors))
                        : router.push("/");
                }
                }
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <InputField label="Username" name="username" placeholder="username"/>
                        <InputField label="Password" name="password" placeholder="password" type="password"/>
                        <Button type="submit" isLoading={isSubmitting} m={5}>Login</Button>
                    </Form>
                )
            }
        </Formik>
    </FormResponsiveContainer>
}

export default Register;