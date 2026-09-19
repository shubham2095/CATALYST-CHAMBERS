import ChoosingRightLawyerDelhiNcr from '../content/blog/choosing-right-lawyer-delhi-ncr'
import IntroducingTheDebrief from '../content/blog/introducing-the-debrief'

export const blogAuthor = {
  name: 'Rohit Ghosh',
  role: 'Founder & Lead Advocate',
  photo: '/rohit.jpeg',
  linkedin: 'https://www.linkedin.com/in/rohit-ghosh-41390078',
}

export const blogPosts = [
  {
    slug: 'introducing-the-debrief',
    title: 'Introducing... The Debrief',
    date: 'December 8, 2025',
    location: 'New Delhi, Delhi, India',
    readingTime: 3,
    excerpt:
      'Advocates occupy a privileged position as officers of the Courts, and such power is not to be wielded lightly. An introduction to this blog, and to the advocate behind it.',
    tags: [
      'Courts', 'Economy', 'Government', 'India', 'Insights',
      'Law', 'Legal', 'Litigation', 'Practice', 'Procedure', 'Process',
    ],
    note:
      '(Rohit Ghosh has provided this information in the public domain for educational and academic purposes. Request is made to credit the author for any use of this document and its contents.)',
    externalLink: 'https://debriefchronicles.blogspot.com/2025/12/introducing-debrief.html',
    externalLinkLabel: 'Read on The Debrief',
    Content: IntroducingTheDebrief,
  },
  {
    slug: 'choosing-the-right-lawyer-in-delhi-ncr',
    title: 'Choosing the Right Lawyer in Delhi NCR for Addressing Your Legal Needs',
    date: 'September 19, 2026',
    location: 'New Delhi, Delhi, India',
    readingTime: 8,
    excerpt:
      'The legal and regulatory landscape in Delhi NCR can feel like a confusing maze to litigants. Here are the key factors to consider before choosing your legal representation.',
    tags: [
      'Corporate', 'Arbitration', 'Advisory', 'Business', 'Delhi NCR',
      'India', 'Insights', 'Law', 'Legal', 'Litigation', 'Practice',
    ],
    Content: ChoosingRightLawyerDelhiNcr,
  },
]

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAdjacentPost(slug) {
  const index = blogPosts.findIndex((post) => post.slug === slug)
  if (index === -1) return null
  return blogPosts[(index + 1) % blogPosts.length]
}
