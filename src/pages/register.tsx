import React, {FC} from "react";
import {Form, Formik, FormikHelpers} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";
import {CredentialsInputs, useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";
import FormResponsiveContainer from "../components/FormResponsiveContainer";

const Register: FC = () => {

    const router = useRouter();

    const [, register] = useRegisterMutation()

    const initialFormValues:CredentialsInputs = {username: "", password: ""};
    const handleRegisterSubmit = async (values:CredentialsInputs, errors: FormikHelpers<CredentialsInputs>) => {
        const response = await register(values);
        response.data?.register.errors
            ? errors.setErrors(toErrorMap(response.data.register.errors))
            : router.push("/");
    };
    return <FormResponsiveContainer>
        <Formik initialValues={initialFormValues} onSubmit={handleRegisterSubmit}>
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
    </FormResponsiveContainer>
}

export default Register;