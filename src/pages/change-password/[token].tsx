import React, {useState} from "react";
import {NextPage} from "next";
import {Form, Formik, FormikHelpers} from "formik";
import InputField from "../../components/InputField";
import {Box, Button, Link} from "@chakra-ui/core";
import FormResponsiveContainer from "../../components/FormResponsiveContainer";
import {ChangePasswordInputs, useChangePasswordMutation} from "../../generated/graphql";
import {toErrorMap} from "../../utils/toErrorMap";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../../graphql/urqlProvider";
import NextLink from 'next/link'

interface ChangePasswordProps {
    token: string;
}

export const ChangePassword: NextPage<ChangePasswordProps> = ({token}) => {

    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const initialNewPasswordValue: ChangePasswordInputs = {newPassword: "", token: ""};
    const [tokenErrorsPresent, setTokenErrorsPresent] = useState<boolean>(false)

    const handleChangePasswordSubmit = async (values: ChangePasswordInputs, errors: FormikHelpers<ChangePasswordInputs>) => {
        const changePasswordNewInputs: ChangePasswordInputs = {
            newPassword: values.newPassword,
            token: token
        }
        const {data: changePasswordResponse} = await changePassword({
            options: changePasswordNewInputs
        });
        const responseErrors = changePasswordResponse?.changePassword.errors;
        if (responseErrors) {
            const amountOfTokenErrors: number =
                responseErrors
                    .filter((error) => error.field === "token")
                    .length;
            if (amountOfTokenErrors > 0) {
                setTokenErrorsPresent(true);
                errors.setErrors(toErrorMap(responseErrors));
            } else {
                errors.setErrors(toErrorMap(responseErrors));
            }
        } else {
            await router.push("/");
        }
    };

    return (<FormResponsiveContainer>
        <Formik initialValues={initialNewPasswordValue} onSubmit={handleChangePasswordSubmit}>
            {
                ({isSubmitting}) => (
                    <Form>
                        <InputField
                            label="New password"
                            name="newPassword"
                            placeholder="New password"
                            type="password"
                            disabled={tokenErrorsPresent}/>
                        {
                            tokenErrorsPresent && <Box mt={5}>
                                <NextLink href="/forgot-password">
                                    <Link>Request another change</Link>
                                </NextLink>
                            </Box>
                        }
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            isDisabled={tokenErrorsPresent}
                            m={5}>
                            Change password
                        </Button>
                    </Form>
                )
            }
        </Formik>
    </FormResponsiveContainer>);
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword);