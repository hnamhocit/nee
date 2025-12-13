import { Category } from '@repo/db'
import { http } from '../config'
import { IResponse } from '../interfaces'
import { CategoryFormValues } from '../schemas'

export const categoriesService = {
	getCategories: () => {
		return http.get<IResponse<Category[]>>('/categories')
	},
	getAdminCategories: () => {
		return http.get<IResponse<Category[]>>('/admin/categories')
	},
	delete: (slug: string) => {
		return http.delete(`/admin/categories/${slug}`)
	},
	create: (data: CategoryFormValues) => {
		return http.post<IResponse<Category>>('/admin/categories', data)
	},
	update: (slug: string, data: CategoryFormValues) => {
		return http.put(`/admin/categories/${slug}`, data)
	},
}
