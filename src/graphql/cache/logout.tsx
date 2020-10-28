import {UpdateResolver} from "@urql/exchange-graphcache";
import {typedResolver} from "./resolvers";
import {LogoutMutation, MeDocument, MeQuery} from "../../generated/graphql";


const logoutCacheResolver: UpdateResolver = (result, args, cache, _info) => {
    //Wrapper to get Types
    typedResolver<LogoutMutation, MeQuery>(
        cache,
        {query: MeDocument},
        result,
() => ({me: null}) // Empty MeQuery means there is no one logged in.
    )
};

export default logoutCacheResolver;