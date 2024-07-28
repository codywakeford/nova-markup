export default (opts = {}) => {
    const { propertiesToTransform } = opts

    return {
        postcssPlugin: "postcss-transform-custom-properties",
        Once(root, { result }) {
            root.walkDecls((decl) => {
                if (propertiesToTransform.includes(decl.prop)) {
                    decl.prop = `--${decl.prop}`
                }
            })

            result.messages.push({
                type: "custom-transform",
                plugin: "postcss-transform-custom-properties",
                transformed: true,
            })
        },
    }
}

export const postcss = true
