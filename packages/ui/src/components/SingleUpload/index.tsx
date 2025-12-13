'use client'

import { FC, useEffect, useRef, useState } from 'react'

interface SingleUploadProps {
	onChange: (file: File) => void
	className?: string
	defaultURL?: string
}

export const SingleUpload: FC<SingleUploadProps> = ({
	onChange,
	className,
	defaultURL,
}) => {
	const [file, setFile] = useState<File | null>(null)
	const [blob, setBlob] = useState<string | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		return () => {
			if (blob) {
				URL.revokeObjectURL(blob)
			}
		}
	})

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			setFile(selectedFile)
			setBlob(URL.createObjectURL(selectedFile))
			onChange(selectedFile)
		}
	}

	return (
		<div
			className={className}
			style={{
				cursor: 'pointer',
				borderRadius: '0.375rem', // 6px,
				overflow: 'hidden',
			}}
			onClick={() => inputRef.current?.click()}>
			<input
				type='file'
				accept='image/*'
				ref={inputRef}
				onChange={handleFileChange}
				hidden
			/>

			{(blob || defaultURL) && (
				<img
					src={blob ?? defaultURL ?? ''}
					alt={blob ?? defaultURL ?? ''}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			)}
		</div>
	)
}
