import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:9010/graphql',
    cache: new InMemoryCache(),
    // defaultOptions: {
    //     query: {
    //         fetchPolicy: 'network-only'
    //     },
    //     watchQuery: {
    //         fetchPolicy: 'network-only'
    //     }
    // }
})

export async function getJob(id) {
    const query = gql`
        query JobById($id: ID!) {
            job(id: $id) {
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

    const { data } = await apolloClient.query({ query, variables: { id } })
    return data.job
}

export async function getJobs() {
    const query = gql`
        query Jobs {
            jobs {
                id
                date
                title
                company {
                    id
                    name
                }
            }
        }
    `

    const { data } = await apolloClient.query({
        query,
        fetchPolicy: 'network-only',
    })
    return data.jobs
}

export async function getCompany(id) {
    const query = gql`
        query CompanyById($id: ID!) {
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    title
                    date
                }
            }
        }
    `

    const { data } = await apolloClient.query({ query, variables: { id } })
    return data.company
}
