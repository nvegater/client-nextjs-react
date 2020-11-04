import React, {FC} from "react";
import {Form, Formik, FormikHelpers} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";
import {RegisterInputs, useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";
import FormResponsiveContainer from "../components/FormResponsiveContainer";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../graphql/urqlProvider";

const Register: FC = () => {

    const router = useRouter();

    const [, register] = useRegisterMutation()

    const initialFormValues: RegisterInputs = {username: "", email: "", password: ""};
    const handleRegisterSubmit = async (values: RegisterInputs, errors: FormikHelpers<RegisterInputs>) => {
        const response = await register({options: values});
        response.data?.register.errors
            ? errors.setErrors(toErrorMap(response.data.register.errors))
            : await router.push("/");
    };
    return <FormResponsiveContainer>
        <Formik initialValues={initialFormValues} onSubmit={handleRegisterSubmit}>
            {
                ({isSubmitting}) => (
                    <Form>
                        <InputField label="Username" name="username" placeholder="username"/>
                        <InputField label="Email" name="email" placeholder="email"/>
                        <InputField label="Password" name="password" placeholder="password" type="password"/>
                        <Button type="submit" isLoading={isSubmitting} m={5}>Register</Button>
                    </Form>
                )
            }
        </Formik>
    </FormResponsiveContainer>
}

export default withUrqlClient(createUrqlClient, {ssr: false})(Register);