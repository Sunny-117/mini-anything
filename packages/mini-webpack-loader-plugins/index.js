
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import { transformFromAst } from 'babel-core'
import { jsonLoader } from './jsonLoader.js'
import { changeOutputPath } from './changeOutputPath.js'
import { SyncHook } from 'tapable'
let id = 0;
const webpackConfig = {
    module: {
        rules: [
            {
                test: /\.json$/,
                use: [jsonLoader]
            }
        ]
    },
    plugins: [new changeOutputPath()]
}
const hooks = {
    emitFile: new SyncHook(["context"])
}
function createAsset(filePath) {
    // 1. 获取文件内容
    let source = fs.readFileSync(filePath, {
        encoding: 'utf-8'
    })
    // initLoader
    const loaders = webpackConfig.module.rules
    const loaderContext = {
        addDeps(dep) {
            console.log('addDeps', dep)
        }
    }
    loaders.forEach(({ test, use }) => {
        if (test.test(filePath)) {
            if (Array.isArray(use)) {
                use.reverse().forEach((fn) => {
                    source = fn.call(loaderContext, source)// 这次输出的source又会传递给下一个loader
                })
            } else {
                source = use(source)
            }

        }
    });


    // 2. 获取依赖关系
    const ast = parser.parse(source, {
        sourceType: "module"
    })
    const deps = []
    traverse.default(ast, {
        /**
         * 访问到ImportDeclaration节点的时候会调用此函数
         */
        ImportDeclaration({ node }) {
            // console.log(node.source.value)
            deps.push(node.source.value)
        }
    })
    const { code } = transformFromAst(ast, null, {
        presets: ['env']
    })
    // console.log(code)
    return {
        filePath,
        code,
        deps,
        mapping: {},
        id: id++
    }
}

function createGraph() {
    const mainAssets = createAsset('./example/main.js')
    // bfs
    const queue = [mainAssets]
    for (const asset of queue) {
        asset.deps.forEach(relativePath => {
            const child = createAsset(path.resolve("./example", relativePath))
            // console.log(child)
            asset.mapping[relativePath] = child.id
            queue.push(child)
        });
    }
    return queue
}
function initPlugins() {
    const plugins = webpackConfig.plugins
    plugins.forEach(plugin => {
        plugin.apply(hooks)
    })
}
initPlugins()

const graph = createGraph()
// console.log(graph)

function build(graph) {
    const template = fs.readFileSync('./bundle.ejs', {
        encoding: 'utf-8'
    })
    // 创建模版数据
    const data = graph.map(asset => {
        const { id, code, mapping } = asset
        return {
            id,
            code,
            mapping
        }
    })
    console.log(data)
    const code = ejs.render(template, { data })
    let outputPath = "./dist/bundle.js"
    const context = {
        changeOutputPath(path) {
            outputPath = path
        }
    }
    // 发出事件
    hooks.emitFile.call(context)

    fs.writeFileSync(outputPath, code)
}
build(graph)