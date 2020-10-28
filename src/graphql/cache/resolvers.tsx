import {CacheExchangeOpts} from "@urql/exchange-graphcache/dist/types/cacheExchange";
import {Cache, QueryInput} from "@urql/exchange-graphcache";
import loginCacheResolver from "./login";
import registerCacheResolver from "./register";

export function typedResolver<Result, Query>(
    cache: Cache,
    queryInput: QueryInput,
    result: any,
    update: (result: Result, query: Query) => Query) {
    return cache.updateQuery(queryInput, data => update(result, data as any) as any)
}

const cacheUpdates: CacheExchangeOpts = {
    updates: {
        Mutation: {
            login: loginCacheResolver,
            register: registerCacheResolver
        }
    }
};

export default cacheUpdates;