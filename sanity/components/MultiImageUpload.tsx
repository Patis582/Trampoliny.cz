import React, { useRef, useCallback, useState } from 'react'
import { ArrayOfObjectsInputProps, useClient, set } from 'sanity'

export function MultiImageUpload(props: ArrayOfObjectsInputProps) {
  const { onChange, value = [] } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState('')

  const handleFiles = useCallback(
    async (files: FileList) => {
      if (!files.length) return
      setProgress(`Nahrávám 0 / ${files.length}…`)
      const newItems: Record<string, unknown>[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setProgress(`Nahrávám ${i + 1} / ${files.length}…`)
        const asset = await client.assets.upload('image', file, { filename: file.name })
        newItems.push({
          _type: 'image',
          _key: Math.random().toString(36).slice(2),
          asset: { _type: 'reference', _ref: asset._id },
        })
      }

      onChange(set([...value, ...newItems]))
      setProgress('')
      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    [client, value, onChange],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files)
        }}
      />
      <div>
        <button
          type="button"
          disabled={!!progress}
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 10px',
            border: '1px solid #d1d5db',
            borderRadius: '3px',
            background: progress ? '#f9fafb' : '#fff',
            color: progress ? '#9ca3af' : '#374151',
            cursor: progress ? 'default' : 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: 1.4,
            transition: 'border-color 0.15s, color 0.15s',
          }}
        >
          {!progress && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          )}
          {progress || 'Nahrát více fotek'}
        </button>
      </div>
      {props.renderDefault(props)}
    </div>
  )
}
