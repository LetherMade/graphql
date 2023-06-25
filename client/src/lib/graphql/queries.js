import {
    ApolloClient,
    ApolloLink,
    concat,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import {
    companyByIdQuery,
    createJobMutation,
    jobByIdQuery,
    jobsQuery,
} from './gql'
import { getAccessToken } from '../auth'

const httpLink = createHttpLink({ uri: 'http://localhost:9010/graphql' })
const authLink = new ApolloLink((operation, forward) => {
    const accessToken = getAccessToken()
    if (accessToken) {
        operation.setContext({
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    }
    return forward(operation)
})

export const apolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
})

export async function getJobs() {
    const { data } = await apolloClient.query({
        query: jobsQuery,
        fetchPolicy: 'network-only',
    })
    return data.jobs
}

export async function getJob(id) {
    const { data } = await apolloClient.query({
        query: jobByIdQuery,
        variables: { id },
    })
    return data.job
}

export async function createJob({ title, description }) {
    const { data } = await apolloClient.mutate({
        mutation: createJobMutation,
        variables: { input: { title, description } },
        update: (cache, { data }) => {
            cache.writeQuery({
                query: jobByIdQuery,
                variables: { id: data.job.id },
                data,
            })
        },
    })

    return data.job
}
