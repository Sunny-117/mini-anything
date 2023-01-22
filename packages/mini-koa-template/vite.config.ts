// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            ],
            imports: [
                {
                    'vitest': [
                        'it',
                        'describe',
                        'expect'
                    ],
                },
            ],
        }),
    ],
})