// @ts-nocheck

import { Tldraw, track, useEditor } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useYjsStore } from './useYjsStore'
import { getAssetUrls } from '@tldraw/assets/selfHosted'

const assetUrls = getAssetUrls({ baseUrl: './assets' })

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev'

export default function YjsExample() {
	const store = useYjsStore({
		roomId: 'example17',
		hostUrl: HOST_URL,
	})

	return (
		<div className="tldraw__editor">
			<Tldraw autoFocus store={store} shareZone={<NameEditor />} assetUrls={assetUrls} />
		</div>
	)
}

const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})
