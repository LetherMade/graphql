import { getAccessToken } from '../auth'
import {
    ApolloClient,
    ApolloLink,
    concat,
    createHttpLink,
    gql,
} from '@apollo/client'
import { jobByIdQuery } from './gql'
import { ApolloInMemorySingletonCache } from './cache'

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

const apolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: ApolloInMemorySingletonCache.getInstance(),
})

export async function createJob({ title, description }) {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
                date
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `

    const { data } = await apolloClient.mutate({
        mutation,
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
