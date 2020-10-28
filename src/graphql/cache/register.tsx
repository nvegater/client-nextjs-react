import {UpdateResolver} from "@urql/exchange-graphcache";
import {MeDocument, MeQuery, RegisterMutation} from "../../generated/graphql";
import {typedResolver} from "./resolvers";

const updateRegisterCache: (result: RegisterMutation, query: MeQuery) => MeQuery = (result, query) => {
    return result.register.errors
        ? query
        : { //insert result of login on cache.
            me: result.register.user
        }
};

const registerCacheResolver: UpdateResolver = (result, args, cache, _info) => {
    //Wrapper to get Types
    typedResolver<RegisterMutation, MeQuery>(
        cache,
        {query: MeDocument},
        result,
        updateRegisterCache
    )
};

export default registerCacheResolver;