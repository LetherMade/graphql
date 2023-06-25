import { getAccessToken } from '../auth'
import {
    ApolloClient,
    ApolloLink,
    concat,
    createHttpLink,
    gql,
    InMemoryCache,
} from '@apollo/client'

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
    cache: new InMemoryCache(),
})

export async function createJob({ title, description }) {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `

    const { data } = await apolloClient.mutate({
        mutation,
        variables: { input: { title, description } },
    })

    return data.job
}
