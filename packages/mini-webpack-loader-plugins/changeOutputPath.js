export class changeOutputPath {
    apply(hooks) {
        hooks.emitFile.tap('changeOutputPath', (context) => {
            console.log('----changeOutputPath')
            context.changeOutputPath("./dist/fzq.js")
        })
    }
}