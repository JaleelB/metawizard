import { Icons } from "@/components/ui/icons";
import { NavItem } from "@/types/types";

export default function Features() {
  const features: NavItem[] = [
    {
      icon: "quick",
      title: "Intuitive Metadata Customization",
      description:
        "Begin with a solid foundation. Our forms guide you through a swift setup of essential metadata, perfect for getting your Next.js project off the ground.",
    },
    {
      icon: "code",
      title: "Real-Time Code Visualization",
      description:
        "Gain instant clarity with our live code preview. As you fill out the forms, see exactly how your metadata will integrate into your project, giving you the confidence to proceed.",
    },
    {
      icon: "seo",
      title: "SEO Foundations with File Conventions",
      description:
        "Optimize your site for search engines with customizable sitemaps, robots.txt, and manifest files, all while adhering to Next.js 13+ best practices for SEO.",
    },
    {
      icon: "social",
      title: "Social Media Ready",
      description:
        "Launch with social media in mind. Our tool prepares your site for sharing with auto-generated images (site icons, opengraph images etc) for social platforms, ensuring a polished look from the very start.",
    },
    {
      icon: "integrate",
      title: "Direct Code Implementation",
      description:
        "Receive ready-to-use code snippets tailored to your metadata inputs. Copy, paste, and you're set—or tweak them as needed to fit your project's evolving requirements.",
    },
    {
      icon: "docs",
      title: "Customizable Documentation",
      description:
        "Along with your metadata, get a tailored guide that outlines the integration process into your Next.js 13+ app, designed to be as straightforward or detailed as you need.",
    },
  ];

  return (
    <section
      id="features"
      className="container space-y-12 py-8 md:py-12 lg:py-24"
    >
      <div className="max-w-[58rem] space-y-4">
        <h2 className="text-[#FF44EC] font-semibold">Features</h2>
        <h3 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Empower Your Next.js 13+ Projects with Smart Metadata Management
        </h3>
        <p className="w-full max-w-3xl text-muted-foreground">
          Unleash the full potential of your Next.js applications with
          MetaWizard. Effortlessly generate, customize, and optimize metadata to
          enhance visibility and engagement.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[80rem] md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = Icons[feature.icon || "arrowRight"];
          return (
            <div
              key={index * Math.random()}
              className="relative overflow-hidden rounded-lg border backdrop-blur-[2px] p-2"
            >
              <div className="flex flex-col justify-between rounded-md p-6 gap-2">
                <div className="w-12 h-12 border-2 rounded-full inline-flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
