# Next.js

- Any component declared under the pages directory is given the route based on its name. For example, `pages/register.tsx` would cause the `register` component to be rendered when the user hits `<protocol><host>/register`.

# SSR vs CSR

- CSR (client-side rendering): the server sends back a bare bones HTML file. JS then runs, and it modifies the DOM elements (ie. the HTML) to insert content. This does not produce good results for SEO purposes.
- SSR (server-side rendering): the server sends back an HTML file with all the dynamic content we want already filled in. Better SEO performance.
- Ben's advice: use SSR for pages that he wants to be searchable by Google. Also SSR is only needed if dynamic data.

# SSR flow

1. user visits website on browser -> localhost:3000
2. a next.js server is created
3. the next.js server queries the graphql server -> localhost:4000
4. next.js server gets response, and creates HTML from it
5. that HTML is returned and displayed in the frontend

# Next.js and SSR

- For a page with SSR enabled, Next.js will server side render it only the first time we visit it. If we then head off to another page, and hit the back button on our browser (or a link) to come back to the page again, then it will now be client-side rendered.
