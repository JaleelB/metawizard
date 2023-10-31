export const steps = [
  {
    title: "Site Config",
    description:
      "Configure the basic information of your site including site name, description, keywords, and URL.",
  },
  {
    title: "Site Images",
    description:
      "Define the visual identity of your website or application. You can also choose to auto-generate these images.",
  },
  {
    title: "Author Config",
    description:
      "Provide author information including name and URLs to author's personal website, GitHub, and Twitter profiles.",
  },
  {
    title: "Sitemap.xml",
    description:
      "Configure the sitemap.xml file to improve site crawling by search engines. ",
  },
  {
    title: "Robots.txt",
    description:
      "Configure the robots.txt file to control how search engines crawl and index your site.",
  },
  {
    title: "Manifest.json",
    description:
      "Configure the manifest.json file to provide information about your site to browsers and devices.",
  },
];

export type Step = (typeof steps)[number];
