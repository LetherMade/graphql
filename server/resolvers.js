import {
    createJob,
    deleteJob,
    getJob,
    getJobs,
    getJobsByCompany,
    updateJob,
} from './db/jobs.js'
import { getCompany } from './db/companies.js'
import { GraphQLError } from 'graphql/error/index.js'

export const resolvers = {
    Query: {
        job: async (_root, { id }) => {
            const job = await getJob(id)
            if (!job) {
                throw notFoundError('No Job found with id: ' + id)
            }
            return job
        },
        jobs: () => getJobs(),
        company: async (_root, { id }) => {
            const company = await getCompany(id)
            if (!company) {
                throw notFoundError('No Company found with id: ' + id)
            }
            return company
        },
    },

    Mutation: {
        createJob: (_root, { input: { title, description } }) => {
            const companyId = 'FjcJCHJALA4i' // todo change to authenticated user company
            return createJob({ companyId, title, description })
        },
        deleteJob: (_root, { id }) => deleteJob(id),
        updateJob: (_root, { input: { id, title, description } }) =>
            updateJob({ id, title, description }),
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },

    Job: {
        date: (job) => toIsoDate(job.createdAt),
        company: (job) => getCompany(job.companyId),
    },
}

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: {
            code: 'NOT_FOUND',
        },
    })
}

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length)
}
