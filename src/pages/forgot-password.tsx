import React, {useState} from "react";
import {useForgotPasswordMutation} from "../generated/graphql";
import {Form, Formik, FormikHelpers} from "formik";
import FormResponsiveContainer from "../components/FormResponsiveContainer";
import InputField from "../components/InputField";
import {Box, Button, Flex, Link} from "@chakra-ui/core";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../graphql/urqlProvider";
import NextLink from "next/link";
import {toErrorMap} from "../utils/toErrorMap";
import Layout from "../components/Layout";

interface ForgotPasswordInputs {
    email: string;
}

const ForgotPassword: React.FC = () => {

    const [, forgotPassword] = useForgotPasswordMutation();
    const [completedMutation, setCompletedMutation] = useState<boolean>(false)

    const initialFormValues: ForgotPasswordInputs = {email: ""};
    const handleForgotPassword = async (values: ForgotPasswordInputs, errors: FormikHelpers<ForgotPasswordInputs>) => {
        const response = await forgotPassword({email: values.email});
        response.data?.forgotPassword.errors
            ? errors.setErrors(toErrorMap(response.data.forgotPassword.errors))
            : setCompletedMutation(true)
    };

    return <Layout>
        <FormResponsiveContainer>
            <Formik initialValues={initialFormValues} onSubmit={handleForgotPassword}>
                {
                    ({isSubmitting}) => completedMutation ?
                        <Flex alignItems="center" flexDirection="column" justifyContent="center">
                            <Box>
                                Email sent
                            </Box>
                            <Box mt={5}>
                                <NextLink href="/login">
                                    <Link>back to login</Link>
                                </NextLink>
                            </Box>
                        </Flex> : (
                            <Form>
                                <InputField label="Email" name="email" placeholder="email"/>
                                <Button type="submit" isLoading={isSubmitting} m={5}>Reset password</Button>
                            </Form>
                        )
                }
            </Formik>
        </FormResponsiveContainer>
    </Layout>
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ForgotPassword);