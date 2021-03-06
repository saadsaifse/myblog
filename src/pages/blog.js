import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostListing from "../components/postListing"
import config from "../../site-config"

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

  const onInputChanged = event => {
    const newSearchTerm = event.target.value
    const { currentCategories } = state
    const filtered = filterPosts(newSearchTerm, currentCategories)
    setState(prev => ({
      ...prev,
      searchTerm: newSearchTerm,
      filteredPosts: filtered,
    }))
  }

  const onCategoryClick = category => {
    const { currentCategories, searchTerm } = state
    let newCategories = currentCategories
    if (!currentCategories.includes(category)) {
      newCategories.push(category)
    } else {
      newCategories = currentCategories.filter(cat => cat !== category)
    }
    const filtered = filterPosts(searchTerm, newCategories)
    setState(prev => ({
      ...prev,
      currentCategories: newCategories,
      filteredPosts: filtered,
    }))
  }

  const filterPosts = (newSearchTerm = "", newCategories = []) => {
    const { posts } = state

    // filter posts based on new search term
    let filteredPosts = posts
    filteredPosts = posts.filter(post =>
      post.node.frontmatter.title
        .toLowerCase()
        .includes(newSearchTerm.toLowerCase())
    )

    // filter posts based on new categories
    filteredPosts = filteredPosts.filter(
      post =>
        post.node.frontmatter.categories &&
        newCategories.every(cat =>
          post.node.frontmatter.categories.includes(cat)
        )
    )
    return filteredPosts
  }

  return (
    <Layout>
      <Helmet title={`Blog – ${config.title}`} />
      <SEO />
      <div className="container">
        <h1>Articles</h1>
        <div className="category-container">
          {categories.map(category => {
            const active = state.currentCategories.includes(category.fieldValue)
            return (
              <div
                className={`category-filter ${active ? "active" : ""}`}
                key={category.fieldValue}
                onClick={() => onCategoryClick(category.fieldValue)}
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
            placeholder="Type here to filter articles..."
            onChange={onInputChanged}
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
          fields {
            slug
            date
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
