// src/pages/index.js
import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
const IndexPage = ({ data }) => {
  const blogPosts = data.allGhostPost.edges
  return (
    <>
      <h1>Blog Posts</h1>
      <div>
        <ul>
          {blogPosts.map((post, i) => (
            <li key={i}>
              <Link to={post.node.slug}>
                {/* GatsbyImage component to render our optimised image */}
                <GatsbyImage
                  image={post.node.remote_image.childImageSharp.gatsbyImageData}
                  alt={post.node.title}
                />
                <p>{post.node.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default IndexPage
export const IndexQuery = graphql`
  query blogListQuery {
    allGhostPost(sort: { fields: [published_at], order: DESC }) {
      edges {
        node {
          slug
          title
          published_at(formatString: "DD MMMM YYYY")
          remote_image {
            childImageSharp {
              # this is the field which we'll pass into the GatsbyImage component
              # we add the DOMINANT_COLOR placeholder to make a nice effect when lazy loading
              gatsbyImageData(placeholder: DOMINANT_COLOR)
            }
          }
        }
      }
    }
  }
`
