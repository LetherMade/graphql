import { gql } from '@apollo/client'

export const jobDetailFragment = gql`
    fragment JobDetails on Job {
        id
        date
        title
        company {
            id
            name
        }
        description
    }
`
