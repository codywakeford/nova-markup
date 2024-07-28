module.exports = {
    plugins: [
        require("./postcss-plugin")({
            propertiesToTransform: ["content-width"], // Add your custom properties here
        }),
    ],
}
