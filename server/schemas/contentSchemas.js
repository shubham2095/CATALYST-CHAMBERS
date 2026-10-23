const { z } = require("zod");

const text = (max = 500) => z.string().trim().max(max);
const longText = (max = 5000) => z.string().trim().max(max);
const icon = z.string().trim().max(40);
// Local paths ("/images/..", "/uploads/..") or full URLs. Empty is allowed.
const assetPath = z.string().trim().max(500);

const site = z.object({
  firmName: text(100).min(1),
  tagline: text(150),
  phone: text(40).min(1),
  whatsapp: z.string().trim().regex(/^\d{8,15}$/, "WhatsApp number must be digits only, with country code."),
  emails: z.array(z.string().trim().email().max(254)).min(1),
  address: text(300),
  jurisdictions: z.array(text(80)).min(1),
  officeHours: z.array(text(120)),
  linkedinUrl: text(300),
  linkedinLabel: text(100),
  footerText: longText(600),
  footerPracticeAreas: z.array(text(120)),
  disclaimerText: longText(2000),
  mapEmbedUrl: text(1500),
  seo: z.object({
    title: text(120),
    description: text(320),
  }),
});

const home = z.object({
  hero: z.object({
    label: text(150),
    title: text(150),
    text: longText(1000),
    primaryCta: text(60),
    secondaryCta: text(60),
    badges: z.array(z.object({ icon, text: text(100) })),
    image: assetPath,
  }),
  stats: z.array(z.object({ icon, value: text(20), label: text(80) })),
  whyChooseUs: z.array(z.object({ icon, title: text(120), desc: longText(500) })),
  practiceAreas: z.array(z.object({ icon, title: text(120), desc: longText(500) })),
  officePhotos: z.array(z.object({ src: assetPath, caption: text(150) })),
});

const about = z.object({
  intro: longText(1500),
  profile: z.object({
    label: text(100),
    name: text(100),
    photo: assetPath,
    badgeValue: text(40),
    badgeLabel: text(60),
    paragraphs: z.array(longText(2000)),
    enrolmentNo: text(60),
    jurisdictions: text(200),
  }),
  timeline: z.array(z.object({ icon, year: text(60), role: text(200), desc: longText(800) })),
  education: z.array(z.object({ degree: text(120), institution: text(200) })),
  affiliations: z.array(z.object({ org: text(200), status: text(200) })),
  publications: z.array(z.object({ title: text(250), source: text(100), date: text(40) })),
});

const services = z.object({
  intro: longText(1000),
  categories: z.array(z.object({ icon, title: text(150), points: z.array(text(250)) })),
  additionalAreas: z.array(text(150)),
  notableMatters: z.array(z.object({ title: text(250), detail: text(300) })),
});

const team = z.object({
  intro: longText(1000),
  members: z.array(
    z.object({
      name: text(100).min(1),
      role: text(150),
      photo: assetPath,
      badge: text(40),
      linkedin: text(300),
      bio: longText(2000),
      specializations: z.array(text(100)),
    })
  ),
});

const gallery = z.object({
  intro: longText(500),
  photos: z.array(z.object({ src: assetPath.min(1), caption: text(150), featured: z.boolean().default(false) })),
});

const faqs = z.object({
  items: z.array(z.object({ question: text(300).min(1), answer: longText(3000).min(1) })),
});

const slug = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only have lowercase letters, numbers and hyphens.");

const blog = z
  .object({
    author: z.object({
      name: text(100),
      role: text(150),
      photo: assetPath,
      linkedin: text(300),
    }),
    posts: z.array(
      z.object({
        slug,
        title: text(250).min(1),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must look like 2026-10-23."),
        location: text(150),
        readingTime: z.number().int().min(1).max(120),
        excerpt: longText(600),
        tags: z.array(text(40)).max(20),
        note: longText(600).default(""),
        externalLink: text(500).default(""),
        externalLinkLabel: text(100).default(""),
        embedUrl: text(500).default(""),
        coverImage: assetPath.default(""),
        seoTitle: text(120).default(""),
        seoDescription: text(320).default(""),
        status: z.enum(["published", "draft"]),
        body: z.string().max(200000).default(""),
      })
    ),
  })
  .superRefine((data, ctx) => {
    const seen = new Set();
    data.posts.forEach((post, i) => {
      if (seen.has(post.slug)) {
        ctx.addIssue({ code: "custom", path: ["posts", i, "slug"], message: `Duplicate slug: ${post.slug}` });
      }
      seen.add(post.slug);
    });
  });

const contentSchemas = { site, home, about, services, team, gallery, faqs, blog };

module.exports = { contentSchemas, SECTIONS: Object.keys(contentSchemas) };
