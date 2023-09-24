export const steps = [
  {
    title: "Site Config",
    description:
      "Configure the basic information of your site including site name, description, keywords, and URL.",
  },
  {
    title: "Site Images",
    description:
      "Upload or provide URLs for your site's logo and Open Graph image. You can also choose to auto-generate these images.",
  },
  {
    title: "Author Config",
    description:
      "Provide author information including name and URLs to author's personal website, GitHub, and Twitter profiles.",
  },
  {
    title: "Robots.txt",
    description:
      "Configure the robots.txt file to control how search engines crawl and index your site.",
  },
  {
    title: "Sitemap.xml",
    description:
      "Configure the sitemap.xml file to improve site crawling by search engines. Define your site's endpoints, change frequency, and priority.",
  },
];

export type Step = (typeof steps)[number];
