import React, {FC} from "react";
import {Form, Formik, FormikHelpers} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";
import {useRouter} from "next/router";
import FormResponsiveContainer from "../components/FormResponsiveContainer";
import {CredentialsInputs, useLoginMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../graphql/urqlProvider";

const Login: FC = () => {

    const router = useRouter();

    const [, login] = useLoginMutation()

    const initialFormValues: CredentialsInputs = {username: "", password: ""};
    const handleLoginSubmit = async (values: CredentialsInputs, errors: FormikHelpers<CredentialsInputs>) => {
        const response = await login({options: values});
        response.data?.login.errors
            ? errors.setErrors(toErrorMap(response.data.login.errors))
            : router.push("/");
    };

    return <FormResponsiveContainer>
        <Formik initialValues={initialFormValues} onSubmit={handleLoginSubmit}>
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

export default withUrqlClient(createUrqlClient, {ssr:false})(Login);