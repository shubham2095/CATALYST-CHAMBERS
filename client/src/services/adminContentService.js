import { api } from './api'

export const listSections = () => api('/admin/content')
export const getSection = (name) => api(`/admin/content/${name}`)
export const saveSection = (name, data) => api(`/admin/content/${name}`, { method: 'PUT', body: data })
