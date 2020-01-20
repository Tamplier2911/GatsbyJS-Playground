import React from "react"
// import { graphql } from "gatsby"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  console.log(data)
  // console.log(data.allMarkdownRemark.edges[0].node.frontmatter)
  // console.log(data.allMarkdownRemark.edges[0].node.html)
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>Gatsby Blog</h1>
        <h4>{data.allMarkdownRemark.totalCount}</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          return (
            <div key={node.id}>
              <span>
                {node.frontmatter.title} - {node.frontmatter.date}
              </span>
              <p>{node.excerpt}</p>
              <p>
                <Link to={node.fields.slug}>Read more..</Link>
              </p>
            </div>
          )
        })}
      </div>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Layout>
  )
}

{
  /* <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link> */
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            title
          }
          html
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`
