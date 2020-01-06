/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Navigation from "./navigation"
import Helmet from "react-helmet"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet
      // bodyAttributes={{
      //   class: `theme ${themeClass}`,
      // }}
      >
        <meta name="title" content={data.title} />
        {/* <meta name="description" content={config.siteDescription} />
        <link rel="shortcut icon" type="image/png" href={favicon} /> */}
      </Helmet>
      <Navigation
        menuLinks={[
          {
            name: "About me",
            link: "/me/",
          },
          {
            name: "Articles",
            link: "/blog/",
          },
          {
            name: "Contact",
            link: "/contact/",
          },
        ]}
      />
      <main id="main-content">{children}</main>
      <footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
