# nova-markup

A Nuxt Powered HTML Framework

### Installation

Import using nuxt layers in the nuxt.config.js

##### For version selection

```js
export default defineNuxtConfig({
    extends: [
        "github:username/repoName", // GitHub Remote Source
        "github:username/repoName/base", // GitHub Remote Source within /base directory
        "github:username/repoName#dev", // GitHub Remote Source from dev branch
        "github:username/repoName#v1.0.0", // GitHub Remote Source from v1.0.0 tag
        "gitlab:username/repoName", // GitLab Remote Source example
        "bitbucket:username/repoName", // Bitbucket Remote Source example
    ],
})
```
