import { useQuery } from '@apollo/client'
import { companyByIdQuery } from './gql'

export const useCompany = (id) => {
    const { data, loading, error } = useQuery(companyByIdQuery, {
        variables: { id },
    })
    return { company: data?.company, loading, error: !!error }
}
