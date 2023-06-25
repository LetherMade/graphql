import { ApolloClient } from '@apollo/client'
import { companyByIdQuery, jobByIdQuery, jobsQuery } from './gql'
import { ApolloInMemorySingletonCache } from './cache'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:9010/graphql',
    cache: ApolloInMemorySingletonCache.getInstance(),
})

export async function getJob(id) {
    const { data } = await apolloClient.query({
        query: jobByIdQuery,
        variables: { id },
    })
    return data.job
}

export async function getJobs() {
    const { data } = await apolloClient.query({
        query: jobsQuery,
        fetchPolicy: 'network-only',
    })
    return data.jobs
}

export async function getCompany(id) {
    const { data } = await apolloClient.query({
        query: companyByIdQuery,
        variables: { id },
    })
    return data.company
}
