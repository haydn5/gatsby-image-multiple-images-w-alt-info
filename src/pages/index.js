import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    {data.vacationPhotos.edges.map(image => (
      <div key={image.node.id}>
        <Img 
          fluid={image.node.childImageSharp.fluid}
          alt={image.node.base.split('-').join(' ').split('.')[0]}
          />
          <p>{image.node.base.charAt(0).toUpperCase() + image.node.base.substr(1).split('-').join(' ').split('.')[0]}</p>
      </div>
    ))}
    
    
  </Layout>
)

export default IndexPage

export const pageQuery = graphql `
  query {
    vacationPhotos: allFile(filter: {extension: {regex: "/(jpg)|(png)|(jpeg)/"}, relativeDirectory: {eq: "my-vacation-photos"}}, sort: {fields: base, order: ASC}) {
      edges {
        node {
          id
          base
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`