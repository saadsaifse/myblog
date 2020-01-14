import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostListing from "../components/postListing"

const BlogPage = props => {
  const { data } = props
  const posts = data.posts.edges
  const categories = data.categories.group

  const [state, setState] = React.useState({
    searchTerm: "",
    currentCategories: [],
    posts: posts,
    filteredPosts: posts,
  })

  const filterPosts = () => {
    let filteredPosts = state.posts.filter(post =>
      post.node.frontmatter.title
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase())
    )

    if (state.currentCategories.length > 0) {
      filteredPosts = filteredPosts.filter(
        post =>
          post.node.frontmatter.categories &&
          state.currentCategories.every(cat =>
            post.node.frontmatter.categories.includes(cat)
          )
      )
    }
    setState({ filteredPosts })
  }

  const handleChange = event => {
    const { name, value } = event.target
    setState({ name: value })
    filterPosts()
  }

  const updateCategories = category => {
    const { currentCategories } = state

    if (!currentCategories.includes(category)) {
      setState(prevState => ({
        currentCategories: [...prevState.currentCategories, category],
      }))
    } else {
      setState(prevState => ({
        currentCategories: prevState.currentCategories.filter(
          cat => category !== cat
        ),
      }))
    }
  }

  return (
    <Layout>
      {/* <Helmet title={`Blog – ${config.siteTitle}`} /> */}
      <SEO />
      <div className="container">
        <h1>Blog</h1>
        <div className="category-container">
          {categories.map(category => {
            const active = state.currentCategories.includes(category.fieldValue)
            return (
              <div
                className={`category-filter ${active ? "active" : ""}`}
                key={category.fieldValue}
                onClick={async () => {
                  await updateCategories(category.fieldValue)
                  await filterPosts()
                }}
              >
                {category.fieldValue}
              </div>
            )
          })}
        </div>
        <div className="search-container">
          <input
            className="search"
            type="text"
            name="searchTerm"
            value={state.searchTerm}
            placeholder="Type here to filter posts..."
            onChange={handleChange}
          />
          <div className="filter-count">{state.filteredPosts.length}</div>
        </div>
        <PostListing postEdges={state.filteredPosts} />
      </div>
    </Layout>
  )
}

export const BlogQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          frontmatter {
            slug
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
    categories: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`

export default BlogPage
