import React, {FC} from "react";
import {Form, Formik, FormikHelpers} from "formik";
import InputField from "../components/InputField";
import {Button, Flex, Link} from "@chakra-ui/core";
import {useRouter} from "next/router";
import FormResponsiveContainer from "../components/FormResponsiveContainer";
import {LoginInputs, useLoginMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../graphql/urqlProvider";
import NextLink from "next/link";
import Layout from "../components/Layout";

const Login: FC = () => {

    const router = useRouter();

    const [, login] = useLoginMutation()

    const initialFormValues: LoginInputs = {usernameOrEmail: "", password: ""};
    const handleLoginSubmit = async (values: LoginInputs, errors: FormikHelpers<LoginInputs>) => {
        const response = await login({options: values});
        response.data?.login.errors
            ? errors.setErrors(toErrorMap(response.data.login.errors))
            : await router.push("/");
    };

    return <Layout>
        <FormResponsiveContainer>
            <Formik initialValues={initialFormValues} onSubmit={handleLoginSubmit}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <InputField label="Username or email" name="usernameOrEmail"
                                        placeholder="Username or email"/>
                            <InputField label="Password" name="password" placeholder="password" type="password"/>
                            <Flex justifyContent="space-between" alignItems="center">
                                <Button type="submit" isLoading={isSubmitting} mt={5}>Login</Button>
                                <Flex flexDirection="column" alignSelf="flex-end">
                                    <NextLink href="/forgot-password">
                                        <Link style={{fontSize: 14}}>reset password</Link>
                                    </NextLink>
                                </Flex>
                            </Flex>
                        </Form>
                    )
                }
            </Formik>
        </FormResponsiveContainer>
    </Layout>
}

export default withUrqlClient(createUrqlClient, {ssr: false})(Login);