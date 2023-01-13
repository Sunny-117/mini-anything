import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
export default {
    input: "./src/index.ts",
    output: [
        {
            format: "cjs",
            file: pkg.main
        },
        {
            format: "es",
            file: pkg.module
        }
    ],
    plugins: [
        typescript()
    ]
}