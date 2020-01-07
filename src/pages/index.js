import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GitHubButton from "react-github-btn"
import PostListing from "../components/postListing"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container">
      <div className="lead">
        <div className="elevator">
          <h1>{`Hey, I'm Saad`}</h1>
          <p>
            I'm a tech enthusiast, a seasoned software engineer and a wannabe
            machine learning engineer.
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

export default IndexPage
