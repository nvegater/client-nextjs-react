import React from "react";
import {NextPage} from "next";
import {Form, Formik, FormikHelpers} from "formik";
import InputField from "../../components/InputField";
import {Button} from "@chakra-ui/core";
import FormResponsiveContainer from "../../components/FormResponsiveContainer";

interface ChangePasswordProps {
    token: string;
}

interface NewPassword {
    newPassword: string;
}

export const ChangePassword: NextPage<ChangePasswordProps> = ({token}) => {
    const initialNewPasswordValue: NewPassword = {newPassword: ""};
    const handleLoginSubmit = async (values: NewPassword, errors: FormikHelpers<NewPassword>) => {
        console.log(values, errors)
    };

    return (<FormResponsiveContainer>
        <Formik initialValues={initialNewPasswordValue} onSubmit={handleLoginSubmit}>
            {
                ({isSubmitting}) => (
                    <Form>
                        <InputField label="New password" name="newPassword" placeholder="New password" type="password"/>
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

export default ChangePassword;