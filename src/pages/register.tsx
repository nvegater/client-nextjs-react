import React, {FC} from "react";
import {Form, Formik, FormikValues} from "formik";
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core";
import {useMutation} from "urql";

//For advanced usage: https://formik.org/docs/api/useFormik
// import {useFormik} from "formik";
/*const formik = useFormik({
    initialValues: {username: "", password: ""},
    onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
    },
})*/

interface RegisterProps {

}

const REGISTER_MUTATION = `
mutation Register ( $username: String!, $password: String!){
  register(options: {username: $username, password: $password}){
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
`

const Register: FC<RegisterProps> = () => {

    const [, updateRegister] = useMutation(REGISTER_MUTATION)

    return <Formik initialValues={{username: "", password: ""}}
                   onSubmit={async (props: FormikValues) => {
                                console.log(props)
                            return await updateRegister(props)
    }}>
        {
            ({isSubmitting}) => (
                <Form>
                    <InputField label="Username" name="username"/>
                    <InputField label="Password" name="password" type="password"/>
                    <Button type="submit" color="teal" isLoading={isSubmitting} m={5}>Register</Button>
                </Form>
            )
        }
    </Formik>
}

export default Register;