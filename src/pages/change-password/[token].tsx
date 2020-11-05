import React from "react";
import {NextPage} from "next";
import {Form, Formik, FormikHelpers} from "formik";
import InputField from "../../components/InputField";
import {Button, Link} from "@chakra-ui/core";
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

    const handleChangePasswordSubmit = async (values: ChangePasswordInputs, errors: FormikHelpers<ChangePasswordInputs>) => {
        const changePasswordNewInputs: ChangePasswordInputs = {
            newPassword: values.newPassword,
            token: token
        }
        const {data: changePasswordResponse} = await changePassword({
            options: changePasswordNewInputs
        });
        const responseErrors = changePasswordResponse?.changePassword.errors;
        responseErrors
            ? errors.setErrors(toErrorMap(responseErrors))
            : await router.push("/");
    };

    return (<FormResponsiveContainer>
        <Formik initialValues={initialNewPasswordValue} onSubmit={handleChangePasswordSubmit}>
            {
                ({isSubmitting}) => (
                    <Form>
                        <InputField label="New password" name="newPassword" placeholder="New password" type="password"/>
                        <NextLink href="/forgot-password">
                            <Link>forgot it again?</Link>
                        </NextLink>
                        <Button type="submit" isLoading={isSubmitting} m={5}>Change password</Button>
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

export default withUrqlClient(createUrqlClient, {ssr:false})(ChangePassword);