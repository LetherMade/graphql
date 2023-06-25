import { InMemoryCache } from '@apollo/client'

export const ApolloInMemorySingletonCache = (function () {
    let cache

    function createInMemoryCache() {
        return new InMemoryCache()
    }

    return {
        getInstance: function () {
            if (!cache) {
                cache = createInMemoryCache()
            }
            return cache
        },
    }
})()
