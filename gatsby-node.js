/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// whenever new node is created
exports.onCreateNode = ({ node, getNode, actions }) => {
  //   console.log(node.internal)
  //   console.log(node.internal.type)

  // get createNode field from action
  const { createNodeField } = actions

  // if node type is MarkdownRemark
  if (node.internal.type === `MarkdownRemark`) {
    // create slug - link that browser can access
    // in order to navigate to the page required
    const slug = createFilePath({ node, getNode })

    // append field to newly created node with value of slug
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// create pages for all markdowns
exports.createPages = ({ graphql, actions }) => {
  // take createPage out of actions
  const { createPage } = actions
  // return query for slugs
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res =>
    // once resolved loop over each node
    // using createPage method on it
    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        // page path is node slug
        path: node.fields.slug,
        // path to template component
        component: path.resolve(`./src/templates/blog-post.js`),
        // slug
        context: {
          slug: node.fields.slug,
        },
      })
    })
  )
}
