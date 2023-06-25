import { connection } from './connection.js'
import { generateId } from './ids.js'

const getJobTable = () => connection.table('job')

export function getJobs() {
    return getJobTable().select()
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
