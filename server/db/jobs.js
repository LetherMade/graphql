import { connection } from './connection.js'
import { generateId } from './ids.js'

const getJobTable = () => connection.table('job')

export async function countJobs() {
    const { count } = await getJobTable().first().count('* as count')
    return count
}

export function getJobs(limit, offset) {
    const query = getJobTable().select().orderBy('createdAt', 'desc')
    if (limit) {
        query.limit(limit)
    }
    if (offset) {
        query.offset(offset)
    }
    return query
}

export function getJobsByCompany(companyId) {
    return getJobTable().select().where({ companyId })
}

export function getJob(id) {
    return getJobTable().first().where({ id })
}

export async function createJob({ companyId, title, description }) {
    const job = {
        id: generateId(),
        companyId,
        title,
        description,
        createdAt: new Date().toISOString(),
    }
    await getJobTable().insert(job)
    return job
}

export async function deleteJob(id, companyId) {
    const job = await getJobTable().first().where({ id, companyId })
    if (!job) {
        return null
    }
    await getJobTable().delete().where({ id })
    return job
}

export async function updateJob({ id, companyId, title, description }) {
    const job = await getJobTable().first().where({ id, companyId })
    if (!job) {
        return null
    }
    const updatedFields = { title }
    if (description) {
        updatedFields.description = description
    }
    await getJobTable().update(updatedFields).where({ id, companyId })
    return { ...job, ...updatedFields }
}
