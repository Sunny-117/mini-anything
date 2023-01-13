(function (modules) {
    function require(id) {
        const [fn, mapping] = modules[id]
        const module = {
            exports: {

            }
        }
        function localRequire(filePath) {
            const id = mapping[filePath]
            return require(id)
        }
        fn(localRequire, module, module.exports)
        return module.exports
    }
    require(0)
})({
    0: [function (require, module, exports) {
        const { foo } = require('./foo.js')
        foo()
        console.log('mainjs')
    }, {
        './foo.js': 1
    }],
    1: [function (require, module, exports) {
        function foo() {
            console.log('foo')
        }
        module.exports = {
            foo
        }
    }, {}],

})