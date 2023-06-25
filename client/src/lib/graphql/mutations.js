import { GraphQLClient, gql } from 'graphql-request'

const client = new GraphQLClient('http://localhost:9010/graphql')

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
