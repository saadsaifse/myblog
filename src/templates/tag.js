import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostListing from "../components/PostListing"
import config from "../../site-config"

const TagTemplate = props => {
  const { tag } = props.pageContext
  const postEdges = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`Articles tagged as "${tag}" – ${config.siteTitle}`} />
      <div className="container">
        <h1>
          Articles tagged as <u>{tag}</u>
        </h1>
        <PostListing postEdges={postEdges} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GetArticlesByTag($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            date
            template
          }
        }
      }
    }
  }
`

export default TagTemplate
