import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/SEO"
import config from "../../site-config"
import { formatDate } from "../utils/dateTime"
import PostTags from "../components/postTags"

const PostTemplate = props => {
  const { slug } = props.pageContext
  const postNode = props.data.markdownRemark
  const post = postNode.frontmatter
  const twitterShare = `http://twitter.com/share?text=${encodeURIComponent(
    post.title
  )}&url=${config.siteUrl}/${post.slug}/&via=saadsaif`

  if (!post.id) {
    post.id = slug
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} – ${config.title}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <div className="container">
        <article className="single container">
          <header className={`single-header`}>
            <div className="flex">
              <h1>{post.title}</h1>
              <div className="post-meta">
                <time className="date">{formatDate(post.date)}</time>/
                <a
                  className="twitter-link"
                  href={twitterShare}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share
                </a>
                /
                {/* <a
                  className="github-link"
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit ✏️
                </a> */}
              </div>
              <PostTags tags={post.tags} />
            </div>
          </header>

          <div
            className="post"
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GetPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        template
        slug
        date
        categories
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`

export default PostTemplate
