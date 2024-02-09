import { AsyncSeriesHook } from "../core/AsyncSeriesHook";

let hook = new AsyncSeriesHook(['name']);

hook.tapPromise('node', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node');
            resolve();
        }, 1000);
    })
});
hook.tapPromise('react', function (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react');
            resolve();
        }, 1000);
    })
});
hook.promise('Sunny').then(function () {
    console.log('all')
});