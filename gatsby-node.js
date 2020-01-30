const path = require("path")
const kebabCase = require("lodash.kebabcase")
const sharp = require("sharp")
sharp.simd(false)
sharp.cache(false)

const postNodes = []

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug

  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${kebabCase(node.frontmatter.title)}/`
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${node.frontmatter.slug}/`
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = new Date(node.frontmatter.date)

        createNodeField({
          node,
          name: "date",
          value: date.toISOString(),
        })
      }
    }
    createNodeField({ node, name: "slug", value: slug })
    postNodes.push(node)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve("src/templates/page.js")
    const postTemplate = path.resolve("src/templates/post.js")

    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    template
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.template === "page") {
            createPage({
              path: edge.node.fields.slug,
              component: pageTemplate,
              context: {
                slug: edge.node.fields.slug,
              },
            })
          }
          if (edge.node.frontmatter.template === "post") {
            createPage({
              path: edge.node.fields.slug,
              component: postTemplate,
              context: {
                slug: edge.node.fields.slug,
              },
            })
          }
        })
      })
    )
  })
}
