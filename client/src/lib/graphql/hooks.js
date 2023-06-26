import { useQuery } from '@apollo/client'
import { companyByIdQuery, jobByIdQuery, jobsQuery } from './gql'

export const useCompany = (id) => {
    const { data, loading, error } = useQuery(companyByIdQuery, {
        variables: { id },
    })
    return { company: data?.company, loading, error: !!error }
}

export const useJobs = () => {
    const { data, loading, error } = useQuery(jobsQuery, {
        fetchPolicy: 'network-only',
    })
    return { jobs: data?.jobs, loading, error: !!error }
}

export const useJob = (id) => {
    const { data, loading, error } = useQuery(jobByIdQuery, {
        variables: { id },
    })
    return { job: data?.job, loading, error: !!error }
}
