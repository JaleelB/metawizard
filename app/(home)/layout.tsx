import BuilderNav from "@/components/builder-nav";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <div className="fixed left-0 top-0 -z-50">
        <div className="sticky left-0 top-0 h-screen w-screen overflow-hidden">
          <div className="bg-muted-foreground/20 absolute inset-0 z-[-1]"></div>

          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern
                id="dotted-pattern"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="black"></circle>
              </pattern>
              <mask id="dots-mask">
                <rect width="100%" height="100%" fill="white"></rect>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#dotted-pattern)"
                ></rect>
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="hsl(var(--background))"
              mask="url(#dots-mask)"
            ></rect>
          </svg>
        </div>
      </div>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
