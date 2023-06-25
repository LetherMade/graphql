import { gql } from '@apollo/client'
import { jobDetailFragment } from './fragments'

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
            ...JobDetails
        }
    }
    ${jobDetailFragment}
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

export const createJobMutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
        job: createJob(input: $input) {
            ...JobDetails
        }
    }
    ${jobDetailFragment}
`
