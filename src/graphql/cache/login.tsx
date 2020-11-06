import {UpdateResolver} from "@urql/exchange-graphcache";
import {LoginMutation, MeDocument, MeQuery} from "../../generated/graphql";
import {typedResolver} from "./resolvers";


const updateLoginCache: (result: LoginMutation, query: MeQuery) => MeQuery = (result, query) => {
    return result.login.errors
        ? query
        : { //insert result of login on cache.
            me: result.login
        }
};
const loginCacheResolver: UpdateResolver = (result, args, cache, _info) => {
    //Wrapper to get Types
    typedResolver<LoginMutation, MeQuery>(
        cache,
        {query: MeDocument},
        result,
        updateLoginCache
    )
};

export default loginCacheResolver;
