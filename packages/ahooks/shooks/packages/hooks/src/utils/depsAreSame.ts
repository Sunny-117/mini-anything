import { DependencyList } from "react";

export default function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
    if (oldDeps === deps) return true
    for (let i = 0; i < oldDeps.length; i++) {
        if (!Object.is(deps[i], oldDeps[i])) return false
    }
    return true
}
