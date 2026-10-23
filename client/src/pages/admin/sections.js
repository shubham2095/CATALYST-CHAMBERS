// The editable parts of the website. `preview` is the public page that shows each one.
export const SECTIONS = [
  { name: 'site', label: 'Site Settings', description: 'Name, phone, email, WhatsApp, address, social links, footer and SEO.', preview: '/' },
  { name: 'home', label: 'Home', description: 'Hero text, counters, highlights and practice areas shown on the home page.', preview: '/' },
  { name: 'about', label: 'About', description: 'Profile, career timeline, education, memberships and publications.', preview: '/about' },
  { name: 'services', label: 'Services', description: 'Practice areas, additional areas and the Track Record (notable matters).', preview: '/services' },
  { name: 'team', label: 'Team', description: 'Team members with photo, bio and specializations.', preview: '/team' },
  { name: 'gallery', label: 'Gallery', description: 'Office photos and captions.', preview: '/gallery' },
  { name: 'faqs', label: 'FAQs', description: 'Frequently asked questions and answers.', preview: '/faq' },
  { name: 'blog', label: 'Blog', description: 'Write, edit, publish or hide blog posts.', preview: '/blog' },
]

export const getSectionInfo = (name) => SECTIONS.find((section) => section.name === name)
