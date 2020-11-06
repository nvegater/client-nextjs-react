import React from "react";

import FormResponsiveContainer from "../components/FormResponsiveContainer";
import InputField from "../components/InputField";
import TextArea from "../components/TextArea";

import {Form, Formik, FormikHelpers} from "formik";
import {Button} from "@chakra-ui/core";

import {CreatePostInputs, useCreatePostMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../graphql/urqlProvider";

const CreatePost: React.FC = () => {
    const [, createPost] = useCreatePostMutation();
    const initialFormValues: CreatePostInputs = {title: "", text: ""};
    const handleCreatePostSubmit = async (values: CreatePostInputs, errors: FormikHelpers<CreatePostInputs>) => {
        const response = await createPost({options: values});
        if (response.data?.createPost.errors) {
            console.log(response.data.createPost.errors)
            errors.setErrors(toErrorMap(response.data.createPost.errors))
        } else {
            // what to do when a post is submitted
        }
    };
    return (
        <FormResponsiveContainer>
            <Formik initialValues={initialFormValues} onSubmit={handleCreatePostSubmit}>
                {
                    ({isSubmitting}) => (
                        <Form>
                            <InputField label="Title" name="title" placeholder="title"/>
                            <TextArea label="Text" name="text" placeholder="...."/>
                            <Button type="submit" isLoading={isSubmitting} mt={5}>Submit post</Button>
                        </Form>
                    )
                }
            </Formik>
        </FormResponsiveContainer>
    );
};

export default withUrqlClient(createUrqlClient, {ssr:false})(CreatePost);