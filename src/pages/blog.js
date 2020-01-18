import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
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

  const { filteredPosts, searchTerm, currentCategories } = state
  const filterCount = filteredPosts.length

  const onInputChanged = async event => {
    const newSearchTerm = event.target.value
    const { searchTerm, posts } = state

    let filtered = posts.filter(post =>
      post.node.frontmatter.title
        .toLowerCase()
        .includes(newSearchTerm.toLowerCase())
    )

    setState(prev => ({
      ...prev,
      searchTerm: newSearchTerm,
      filteredPosts: filtered,
    }))
  }

  const onCategoryClick = category => {
    const { currentCategories, searchTerm, posts } = state
    let newCategories = currentCategories
    if (!currentCategories.includes(category)) {
      newCategories.push(category)
    } else {
      newCategories = currentCategories.filter(cat => cat !== category)
    }

    let filtered = posts.filter(post =>
      post.node.frontmatter.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

    if (newCategories.length > 0) {
      filtered = filtered.filter(
        post =>
          post.node.frontmatter.categories &&
          newCategories.every(cat =>
            post.node.frontmatter.categories.includes(cat)
          )
      )
    }

    setState(prev => ({
      ...prev,
      currentCategories: newCategories,
      filteredPosts: filtered,
    }))
  }

  return (
    <Layout>
      <Helmet title={`Blog – ${config.title}`} />
      <SEO />
      <div className="container">
        <h1>Blog</h1>
        <div className="category-container">
          {categories.map(category => {
            const active = currentCategories.includes(category.fieldValue)
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
            value={searchTerm}
            placeholder="Type here to filter posts..."
            onChange={onInputChanged}
          />
          <div className="filter-count">{filterCount}</div>
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
