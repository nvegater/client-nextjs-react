import {UpdateResolver} from "@urql/exchange-graphcache";
import {typedResolver} from "./resolvers";
import {ChangePasswordMutation, MeDocument, MeQuery} from "../../generated/graphql";

const updateChangePasswordCache: (result: ChangePasswordMutation, query: MeQuery) => MeQuery = (result, query) => {
    return result.changePassword.errors
        ? query
        : { //insert result of login on cache.
            me: result.changePassword
        }
};

const changePasswordCacheResolver: UpdateResolver = (result, args, cache, _info) => {
    //Wrapper to get Types
    typedResolver<ChangePasswordMutation, MeQuery>(
        cache,
        {query: MeDocument},
        result,
        updateChangePasswordCache
    )
};

export default changePasswordCacheResolver;