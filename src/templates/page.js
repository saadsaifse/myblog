import React, { Component } from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import config from "../../site-config"

const PageTemplate = props => {
  const { slug } = props.pageContext
  const postNode = props.data.markdownRemark
  const page = postNode.frontmatter

  if (!page.id) {
    page.id = slug
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${page.title} – ${config.title}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <div className="container">
        <article>
          <header className="page-header">
            <h1>{page.title}</h1>
          </header>
          <div
            className="page"
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GetPageBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        template
        slug
        date
      }
      fields {
        slug
        date
      }
    }
  }
`

export default PageTemplate
