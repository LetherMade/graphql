import { useMutation, useQuery } from '@apollo/client'
import {
    companyByIdQuery,
    createJobMutation,
    jobByIdQuery,
    jobsQuery,
} from './gql'

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

export const useCreateJob = () => {
    const [mutate, { error, loading }] = useMutation(createJobMutation)

    const createJob = async (title, description) => {
        const {
            data: { job },
        } = await mutate({
            variables: { input: { title, description } },
            update: (cache, { data }) => {
                cache.writeQuery({
                    query: jobByIdQuery,
                    variables: { id: data.job.id },
                    data,
                })
            },
        })

        return job
    }

    return {
        createJob,
        error: !!error,
        loading,
    }
}
