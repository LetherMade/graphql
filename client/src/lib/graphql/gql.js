import { gql } from '@apollo/client'

export const jobsQuery = gql`
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

export const jobByIdQuery = gql`
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

export const companyByIdQuery = gql`
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
