import {FieldError} from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]): Record<string, string> => {
    const errorMap: Record<string, string> = {}
    errors.forEach(({field, message}) => {
        if (field === "token") {
            // set the token error in the newPassword input field
            errorMap['newPassword'] = message
        } else {
            errorMap[field] = message
        }
    })
    return errorMap
}