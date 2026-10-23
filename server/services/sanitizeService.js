const sanitizeHtml = require("sanitize-html");

// Blog posts are written by the admin, but the HTML is still cleaned before it is saved and shown to visitors.
const BLOG_OPTIONS = {
  allowedTags: ["p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "blockquote", "ul", "ol", "li", "a", "span", "hr", "img"],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt"],
    h3: ["class"],
    span: ["class"],
  },
  // Only the classes the blog styling uses (numbered headings) are kept.
  allowedClasses: {
    h3: ["blog-numbered-heading"],
    span: ["blog-numbered-heading-badge"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href || "";
      const external = /^https?:/i.test(href);

      return {
        tagName,
        attribs: external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href },
      };
    },
  },
};

function sanitizeBlogHtml(html = "") {
  return sanitizeHtml(html, BLOG_OPTIONS);
}

module.exports = { sanitizeBlogHtml };
