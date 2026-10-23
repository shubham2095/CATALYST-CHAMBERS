// Describes the form for each section. The editor pages draw their forms from this.
// Field types: text, textarea, image, icon, checkbox, strings (list of lines), group (object), list (list of objects).

const text = (key, label, extra = {}) => ({ type: 'text', key, label, ...extra })
const textarea = (key, label, extra = {}) => ({ type: 'textarea', key, label, ...extra })
const image = (key, label, extra = {}) => ({ type: 'image', key, label, ...extra })
const icon = (key = 'icon') => ({ type: 'icon', key, label: 'Icon' })
const strings = (key, label, extra = {}) => ({ type: 'strings', key, label, ...extra })
const group = (key, label, fields) => ({ type: 'group', key, label, fields })
const list = (key, label, titleKey, fields, extra = {}) => ({ type: 'list', key, label, titleKey, fields, ...extra })

export const SECTION_FIELDS = {
  site: [
    text('firmName', 'Firm name'),
    text('tagline', 'Tagline', { help: 'Shown under the firm name, e.g. Advocates & Consultants.' }),
    text('phone', 'Phone number', { help: 'Shown on the site, e.g. +91 88266 54793.' }),
    text('whatsapp', 'WhatsApp number', { help: 'Digits only with country code, no + or spaces. Example: 918826654793' }),
    strings('emails', 'Email addresses', { addLabel: 'Add email', help: 'The first email is the main one (used in the header, footer and Contact buttons).' }),
    textarea('address', 'Office address', { rows: 2 }),
    strings('jurisdictions', 'Areas served', { addLabel: 'Add area' }),
    strings('officeHours', 'Office hours', { addLabel: 'Add line' }),
    text('linkedinUrl', 'LinkedIn profile link'),
    text('linkedinLabel', 'LinkedIn name', { help: 'The name shown next to the LinkedIn icon in the header.' }),
    textarea('footerText', 'Footer text', { rows: 3 }),
    strings('footerPracticeAreas', 'Practice areas listed in the footer', { addLabel: 'Add area' }),
    textarea('disclaimerText', 'Disclaimer pop-up text', { rows: 7 }),
    text('mapEmbedUrl', 'Google Maps embed link', { help: 'On Google Maps: Share → Embed a map → copy only the address inside src="…".' }),
    group('seo', 'Search engine (SEO) defaults', [text('title', 'Page title'), textarea('description', 'Description', { rows: 3 })]),
  ],

  home: [
    group('hero', 'Top section (hero)', [
      text('label', 'Small label'),
      text('title', 'Main heading'),
      textarea('text', 'Paragraph', { rows: 5 }),
      text('primaryCta', 'Main button text'),
      text('secondaryCta', 'Second button text'),
      list('badges', 'Badges', 'text', [icon(), text('text', 'Text')], { addLabel: 'Add badge' }),
      image('image', 'Portrait photo'),
    ]),
    list('stats', 'Counters', 'label', [icon(), text('value', 'Number (e.g. 10+)'), text('label', 'Label')], { addLabel: 'Add counter' }),
    list('whyChooseUs', 'Why choose us', 'title', [icon(), text('title', 'Title'), textarea('desc', 'Description')], { addLabel: 'Add point' }),
    list('practiceAreas', 'Practice areas (home page cards)', 'title', [icon(), text('title', 'Title'), textarea('desc', 'Description')], { addLabel: 'Add practice area' }),
    list('officePhotos', 'Office photos on the home page', 'caption', [image('src', 'Photo'), text('caption', 'Caption')], { addLabel: 'Add photo' }),
  ],

  about: [
    textarea('intro', 'Introduction', { rows: 5 }),
    group('profile', 'Founder profile', [
      text('label', 'Small label'),
      text('name', 'Name'),
      image('photo', 'Photo'),
      text('badgeValue', 'Badge number (e.g. 10+ Years)'),
      text('badgeLabel', 'Badge label'),
      strings('paragraphs', 'Paragraphs', { multiline: true, addLabel: 'Add paragraph' }),
      text('enrolmentNo', 'Enrolment number'),
      text('jurisdictions', 'Jurisdictions'),
    ]),
    list('timeline', 'Professional journey', 'role', [icon(), text('year', 'Years'), text('role', 'Role'), textarea('desc', 'Description')], { addLabel: 'Add role' }),
    list('education', 'Education', 'degree', [text('degree', 'Degree'), text('institution', 'Institution')], { addLabel: 'Add degree' }),
    list('affiliations', 'Bar affiliations', 'org', [text('org', 'Organisation'), text('status', 'Status / years')], { addLabel: 'Add affiliation' }),
    list('publications', 'Publications', 'title', [text('title', 'Title'), text('source', 'Published on'), text('date', 'Date (e.g. Sept 2022)')], { addLabel: 'Add publication' }),
  ],

  services: [
    textarea('intro', 'Introduction', { rows: 4 }),
    list('categories', 'Practice areas', 'title', [icon(), text('title', 'Title'), strings('points', 'Points', { addLabel: 'Add point' })], { addLabel: 'Add practice area' }),
    strings('additionalAreas', 'Additional practice areas', { addLabel: 'Add area' }),
    list('notableMatters', 'Track record (notable matters)', 'title', [text('title', 'Matter'), text('detail', 'Details')], { addLabel: 'Add matter' }),
  ],

  team: [
    textarea('intro', 'Introduction', { rows: 3 }),
    list(
      'members',
      'Team members',
      'name',
      [
        text('name', 'Name'),
        text('role', 'Designation'),
        image('photo', 'Photo'),
        text('badge', 'Badge on photo (e.g. 10+ Years)'),
        text('linkedin', 'LinkedIn link'),
        textarea('bio', 'Bio', { rows: 6 }),
        strings('specializations', 'Specializations', { addLabel: 'Add specialization' }),
      ],
      { addLabel: 'Add team member' }
    ),
  ],

  gallery: [
    textarea('intro', 'Introduction', { rows: 2 }),
    list(
      'photos',
      'Photos',
      'caption',
      [image('src', 'Photo'), text('caption', 'Caption'), { type: 'checkbox', key: 'featured', label: 'Show this photo larger (featured)' }],
      { addLabel: 'Add photo' }
    ),
  ],

  faqs: [list('items', 'Questions', 'question', [text('question', 'Question'), textarea('answer', 'Answer', { rows: 5 })], { addLabel: 'Add question' })],
}
