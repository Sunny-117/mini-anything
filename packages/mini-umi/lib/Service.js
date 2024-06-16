/**
 * Service其实就是插件的核心 
 * 也就是所谓的微内核了
 * 1.命令注册和执行
 */
let PluginAPI = require('./PluginAPI');
let { AsyncParallelHook } = require('tapable');
class Service {
    constructor(opts) {
        //key命令的名字 值 就是一个命令对象 {dev:{fn}}
        this.commands = {};//存放着所有的命令和它们的对实现
        this.plugins = opts.plugins;//[{id:'dev',apply:pluginDev}]
        this.hooksByPluginId = {};//按插件ID绑定的钩子{插件ID,[hook]}
        this.hooks = {};//钩子 是按类型划分的 {'event':[{hook},{hook}]}
    }
    async init() {
        //挂载所有的插件
        for (let plugin of this.plugins) {
            let pluginAPI = new PluginAPI({ id: plugin.id, service: this });
            pluginAPI.onGenerateFiles = (fn) => {
                pluginAPI.register({
                    pluginId: plugin.id,
                    key: 'onGenerateFiles',
                    fn
                });
            }
            plugin.apply(pluginAPI);
        }
        Object.keys(this.hooksByPluginId).forEach(pluginId => {
            let pluginHooks = this.hooksByPluginId[pluginId];
            pluginHooks.forEach(hook => {
                const { key } = hook;
                hook.pluginId = pluginId;//这个hook是哪个插件挂载上来的
                this.hooks[key] = (this.hooks[key] || []).concat(hook);
            });
        });
    }
    async applyPlugins(opts) {
        let hooksForKey = this.hooks[opts.key] || [];
        //AsyncSeriesWaterfallHook
        let tEvent = new AsyncParallelHook(['_']);
        for (const hook of hooksForKey) {
            tEvent.tapPromise({ name: hook.pluginId }, hook.fn);
        }
        return await tEvent.promise();
    }
    async run(args) {
        this.init();
        return this.runCommand(args);
    }
    async runCommand({ name }) {
        const command = this.commands[name];
        return command.fn();
    }
}
module.exports = Service;