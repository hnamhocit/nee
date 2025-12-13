import { http } from '../config'
import { IResponse } from '../interfaces'

export const uploadService = {
	uploadFile: (data: FormData) => {
		return http.post<IResponse<string>>('/upload/file', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},
	uploadFiles: (data: FormData) => {
		return http.post<IResponse<string[]>>('/upload/files', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},
	deleteFile: (key: string) => {
		return http.delete(`/upload/${key}`)
	},
}
