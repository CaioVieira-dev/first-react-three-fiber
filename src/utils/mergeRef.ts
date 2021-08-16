import { MutableRefObject } from 'react'
const isMutableRefObject = <t>(
    thing: any
): thing is MutableRefObject<t> =>
    (thing as MutableRefObject<t>) !== undefined

export const mergeRefs = <T>(...refs: React.Ref<T>[]) => {
    const filteredRefs = refs.filter(Boolean)
    if (!filteredRefs.length) return null
    if (filteredRefs.length === 1) return filteredRefs[0]

    return (inst: T) => {
        for (const ref of filteredRefs) {
            if (typeof ref === 'function') {
                ref(inst)
            } else if (isMutableRefObject<T>(ref)) {
                ref.current = inst
            }
        }
    }
}