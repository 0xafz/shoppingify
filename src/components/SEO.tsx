import React from "react"
import defaults from "~/config"
import Head from "next/head"
type SEOProps = {
  title?: string
  description?: string
  path?: string
  image?: string
  preconnectGitApi?: boolean
  imageOwnerProfile?: string
}

const SEO: React.FC<SEOProps> = (props) => {
  if (defaults.baseUrl === "" && typeof window !== "undefined") {
    defaults.baseUrl = window.location.origin
  }

  if (defaults.baseUrl === "") {
    console.error("Please set a baseUrl in your site metadata!")
    return null
  }

  const title = props.title || defaults.title
  const description = props.description || defaults.description
  const url = new URL(props.path || "", defaults.baseUrl).href
  const image = props.image || defaults.image

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      {props.preconnectGitApi && (
        <link rel="preconnect" href="https://api.github.com"></link>
      )}
      <meta name="description" content={description} />
      {image && <meta name="image" content={image} />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {props.imageOwnerProfile && (
        <meta property="og:image:owner" content={props.imageOwnerProfile} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={"zkindest"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {props.imageOwnerProfile && (
        <meta
          property="twitter:image:owner"
          content={props.imageOwnerProfile}
        />
      )}
    </Head>
  )
}

export default SEO
