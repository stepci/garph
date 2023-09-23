import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'www',
  ignoreDeadLinks: true,
  title: "Garph",
  description: "GraphQL. Reimagined",
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logo/r6N.svg',
      dark: '/logo/r5m.svg',
    },
    // logo: {
    //   light: '/logo/r6p.svg',
    //   dark: '/logo/r5y.svg'
    // },
    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/index.md' },
      { text: 'API', link: '/api/index.md' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stepci/garph' },
      { icon: 'twitter', link: 'https://twitter.com/ci_step' },
      { icon: 'discord', link: 'https://discord.gg/KqJJzJ3BTu' }
    ],
    editLink: {
      pattern: 'https://github.com/stepci/garph/edit/main/www/:path',
      text: 'Edit this page on GitHub'
    },
    outline: [2, 3],
    sidebar: {
      '/docs': [
        {
          text: 'Guide',
          items: [
            { text: 'Quickstart', link: '/docs/index.md' },
            { text: 'Schemas', link: '/docs/guide/schemas.md' },
            { text: 'Resolvers', link: '/docs/guide/resolvers.md' },
            { text: 'Loaders', link: '/docs/guide/loaders.md' },
            { text: 'Inferring Types', link: '/docs/guide/inferring-types.md' },
            { text: 'Migrate <span class="badge-new">New</span>', link: '/docs/guide/migrate.md' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Auth', link: '/docs/advanced/auth.md' },
            { text: 'Context', link: '/docs/advanced/context.md' },
            { text: 'File Uploads', link: '/docs/advanced/file-uploads.md' },
            { text: 'Defer and Stream', link: '/docs/advanced/defer-stream.md' },
            { text: 'Subscriptions', link: '/docs/advanced/subscriptions.md' },
            { text: 'Pagination', link: '/docs/advanced/pagination.md' },
            { text: 'Relay', link: '/docs/advanced/relay.md' },
            { text: 'Validation', link: '/docs/advanced/validation.md' },
            { text: 'Federation', link: '/docs/advanced/federation.md' },
            { text: 'Errors', link: '/docs/advanced/errors.md' },
            { text: 'Testing', link: '/docs/advanced/testing.md' },
            { text: 'Extending Garph', link: '/docs/advanced/extending-garph.md' },
          ]
        },
        {
          text: 'Integration',
          items: [
            {
              text: 'Examples', collapsed: true, items: [
                { text: `Next.js <small style="display: block">Yoga + GQty</small>`, link:'/docs/integration/examples/nextjs.md' },
                { text: 'Nuxt <small style="display: block">Yoga + Vue Apollo</small>', link:'/docs/integration/examples/nuxt.md' },
                { text: 'Remix <small style="display: block">Yoga + GQty</small>', link:'/docs/integration/examples/remix.md' },
              ]
            },
            {
              text: 'Server', collapsed: true, items: [
                { text: 'Yoga', link:'/docs/integration/server/graphql-yoga.md' },
                { text: 'Apollo Server', link:'/docs/integration/server/apollo-server.md' },
                { text: 'Mercurius', link:'/docs/integration/server/mercurius.md' },
              ]
            },
            {
              text: 'Client', collapsed: true, items: [
                { text: 'GQty — Universal', link:'/docs/integration/client/gqty.md' },
                { text: 'urql — React', link:'/docs/integration/client/urql.md' },
                { text: 'Vue Apollo — Vue', link:'/docs/integration/client/vue-apollo.md' },
                { text: 'Fetch API', link:'/docs/integration/client/fetch.md' },
              ]
            },
            // { text: 'ChatGPT', link:'/docs/integration/chatgpt.md' },
          ]
        },
        {
          text: 'Comparisons', link: '/docs/comparisons.md',
        }
      ],
    }
  }
})
