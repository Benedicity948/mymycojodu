import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
}

function setMetaTag(
  name: string,
  content: string,
  attribute: "name" | "property" = "name",
) {
  const tag = document.querySelector(
    `meta[${attribute}="${name}"]`,
  ) as HTMLMetaElement | null;

  if (tag) {
    tag.setAttribute("content", content);
    return;
  }

  const newTag = document.createElement("meta");
  newTag.setAttribute(attribute, name);
  newTag.setAttribute("content", content);
  document.head.appendChild(newTag);
}

function SEO({
  title,
  description,
  image = "/src/assets/Images/logo.webp",
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = title
      ? `${title} | MFM Youth Church Ojodu`
      : "MFM Youth Church Ojodu | Mountain of Fire and Miracles Ministries";

    const pageDescription =
      description ||
      "Mountain of Fire and Miracles Ministries Youth Church Ojodu Berger is a vibrant Christian youth fellowship focused on prayer, holiness, Bible study, and spiritual growth.";

    const canonicalUrl = `${window.location.origin}${location.pathname}`;

    document.title = pageTitle;
    setMetaTag("description", pageDescription);
    setMetaTag(
      "keywords",
      "MFM Youth Church Ojodu, Mountain of Fire and Miracles Ministries, Ojodu Berger youth church, Christian youth fellowship, prayer meeting, Bible study",
    );
    setMetaTag(
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    setMetaTag(
      "author",
      "Mountain of Fire and Miracles Ministries Youth Church Ojodu",
    );
    setMetaTag("og:title", pageTitle, "property");
    setMetaTag("og:description", pageDescription, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:url", canonicalUrl, "property");
    setMetaTag("og:image", image, "property");
    setMetaTag("og:site_name", "MFM Youth Church Ojodu", "property");
    setMetaTag("og:locale", "en_NG", "property");
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", pageTitle);
    setMetaTag("twitter:description", pageDescription);
    setMetaTag("twitter:image", image);

    let canonicalTag = document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonicalUrl);
  }, [description, image, location.pathname, title]);

  return null;
}

export default SEO;
