import { connection } from './connection.js'

const getCompanyTable = () => connection.table('company')

export function getCompany(id) {
    return getCompanyTable().first().where({ id })
}
