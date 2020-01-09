import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GitHubButton from "react-github-btn"
import PostListing from "../components/postListing"

const IndexPage = props => {
  const { data } = props
  const latestPostEdges = data.latest.edges
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container">
        <div className="lead">
          <div className="elevator">
            <h1>{`Hey, I'm Saad`}</h1>
            <p>
              I'm an electrical & computer engineer by bachelors and a maps and
              data guy by masters. A seasoned and passionate software engineer,
              a hobbyist statistician, data scientist, machine learning and AI
              enthusiast.
            </p>
            <div className="social-buttons">
              <GitHubButton
                href="https://github.com/saadsaifse"
                data-size="large"
                data-show-count="true"
              >
                saadsaifse
              </GitHubButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container front-page">
        <section className="section">
          <h2>
            Latest Articles
            <Link to="/blog" className="view-all">
              View all
            </Link>
          </h2>
          <PostListing simple postEdges={[]} />
        </section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(limit: 6) {
      edges {
        node {
          frontmatter {
            title
            tags
            categories
            date
            template
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
