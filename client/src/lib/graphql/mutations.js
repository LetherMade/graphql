import { GraphQLClient, gql } from 'graphql-request'
import { getAccessToken } from '../auth'

const client = new GraphQLClient('http://localhost:9010/graphql', {
    headers: () => {
        const accessToken = getAccessToken()
        if (accessToken) {
            return { Authorization: `Bearer ${accessToken}` }
        }
        return {}
    },
})

export async function createJob({ title, description }) {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `

    const { job } = await client.request(mutation, {
        input: { title, description },
    })

    return job
}
