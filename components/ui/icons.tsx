import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FilePlus,
  Home,
  HelpCircle,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  CheckCircle2,
  XCircle,
  Rocket,
  Search,
  Link,
  Layers,
  Columns,
  Globe,
  BellRing,
  Menu,
  ShieldAlert,
  CircleDashed,
  Copy,
} from "lucide-react";

export const Icons = {
  home: Home,
  onboarding: Rocket,
  close: X,
  checkCircle: CheckCircle2,
  xCircle: XCircle,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  file: FilePlus,
  settings: Settings,
  ellipsis: MoreVertical,
  menu: Menu,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  sun: SunMedium,
  moon: Moon,
  copy: Copy,
  laptop: Laptop,
  search: Search,
  link: Link,
  projects: Layers,
  column: Columns,
  services: Globe,
  notifications: BellRing,
  error: ShieldAlert,
  circle: CircleDashed,
  check: Check,
  twitter: ({ ...props }: LucideProps) => (
    <svg
      {...props}
      height="23"
      viewBox="0 0 1200 1227"
      width="23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  logo: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
    >
      <path
        d="M2.96632 25.9888C2.54315 25.4402 2.27826 24.7863 2.20039 24.0979V23.7641C2.25757 23.5888 2.52945 23.0263 2.95039 22.2013H8.15632L7.94257 22.5547C6.63382 24.7185 5.62507 26.3797 5.42351 26.5916C4.6482 27.3876 3.58507 26.8916 2.96632 25.9888ZM16.5404 13.7188C16.2235 13.2501 15.9282 12.8226 15.6601 12.456C15.5851 12.349 15.4855 12.2617 15.3696 12.2014C15.2538 12.1411 15.1251 12.1097 14.9945 12.1097C14.8638 12.1097 14.7351 12.1411 14.6193 12.2014C14.5034 12.2617 14.4038 12.349 14.3288 12.456C14.0616 12.8226 13.7663 13.2491 13.4485 13.7188H7.43257C9.50445 9.87505 11.4901 6.25724 11.8866 5.64787C12.7407 4.33537 13.0013 4.05412 14.4441 4.00818H15.5448C16.9876 4.05505 17.2482 4.34005 18.1013 5.64787C18.4988 6.25724 20.4844 9.8713 22.5563 13.7188H16.5404ZM21.8335 22.1994L22.0473 22.5529C23.3598 24.7176 24.3601 26.3788 24.5663 26.5907C25.3416 27.3866 26.4038 26.8907 27.0226 25.9879C27.513 25.3673 27.7857 24.6027 27.7988 23.8119C27.5814 23.2582 27.3274 22.7195 27.0385 22.1994H21.8335ZM3.68257 14.6104C3.21212 14.619 2.76432 14.814 2.43755 15.1526C2.11077 15.4911 1.93173 15.9455 1.93976 16.416V19.5041C1.93541 19.7373 1.97705 19.9691 2.06228 20.1862C2.14752 20.4033 2.2747 20.6014 2.43654 20.7694C2.59838 20.9373 2.79172 21.0717 3.00552 21.1649C3.21932 21.2581 3.44938 21.3083 3.68257 21.3126H26.3176C26.788 21.3039 27.2358 21.1089 27.5626 20.7704C27.8894 20.4318 28.0684 19.9774 28.0604 19.5069V16.416C28.0684 15.9455 27.8894 15.4911 27.5626 15.1526C27.2358 14.814 26.788 14.619 26.3176 14.6104H3.68257ZM3.68257 16.1807H26.3176C26.348 16.1812 26.378 16.1876 26.4059 16.1997C26.4338 16.2118 26.4591 16.2293 26.4802 16.2511C26.5014 16.273 26.518 16.2988 26.5292 16.3271C26.5404 16.3554 26.5459 16.3856 26.5454 16.416V19.5041C26.5459 19.5345 26.5404 19.5647 26.5292 19.593C26.518 19.6213 26.5014 19.6471 26.4802 19.669C26.4591 19.6908 26.4338 19.7083 26.4059 19.7204C26.378 19.7325 26.348 19.7389 26.3176 19.7394H22.6801V18.2488C22.6816 18.1265 22.6346 18.0085 22.5494 17.9206C22.4642 17.8328 22.3477 17.7823 22.2254 17.7801H21.5176C21.3952 17.7823 21.2787 17.8328 21.1936 17.9206C21.1084 18.0085 21.0614 18.1265 21.0629 18.2488V19.7404H15.8082V18.2488C15.8097 18.1265 15.7627 18.0085 15.6775 17.9206C15.5923 17.8328 15.4759 17.7823 15.3535 17.7801H14.6457C14.5234 17.7823 14.4069 17.8328 14.3217 17.9206C14.2365 18.0085 14.1895 18.1265 14.191 18.2488V19.7404H8.93726V18.2488C8.93877 18.1265 8.89179 18.0085 8.8066 17.9206C8.7214 17.8328 8.60491 17.7823 8.48257 17.7801H7.77476C7.65242 17.7823 7.53593 17.8328 7.45074 17.9206C7.36554 18.0085 7.31857 18.1265 7.32007 18.2488V19.7404H3.68257C3.65216 19.7399 3.62215 19.7334 3.59424 19.7213C3.56633 19.7092 3.54108 19.6918 3.51992 19.6699C3.49877 19.648 3.48213 19.6222 3.47095 19.594C3.45976 19.5657 3.45427 19.5355 3.45476 19.5051V16.416C3.45427 16.3856 3.45976 16.3554 3.47095 16.3271C3.48213 16.2988 3.49877 16.273 3.51992 16.2511C3.54108 16.2293 3.56633 16.2118 3.59424 16.1997C3.62215 16.1876 3.65216 16.1812 3.68257 16.1807Z"
        fill="currentColor"
      />
    </svg>
  ),
  icon: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
    >
      <path
        d="M2.96632 25.9888C2.54315 25.4402 2.27826 24.7863 2.20039 24.0979V23.7641C2.25757 23.5888 2.52945 23.0263 2.95039 22.2013H8.15632L7.94257 22.5547C6.63382 24.7185 5.62507 26.3797 5.42351 26.5916C4.6482 27.3876 3.58507 26.8916 2.96632 25.9888ZM16.5404 13.7188C16.2235 13.2501 15.9282 12.8226 15.6601 12.456C15.5851 12.349 15.4855 12.2617 15.3696 12.2014C15.2538 12.1411 15.1251 12.1097 14.9945 12.1097C14.8638 12.1097 14.7351 12.1411 14.6193 12.2014C14.5034 12.2617 14.4038 12.349 14.3288 12.456C14.0616 12.8226 13.7663 13.2491 13.4485 13.7188H7.43257C9.50445 9.87505 11.4901 6.25724 11.8866 5.64787C12.7407 4.33537 13.0013 4.05412 14.4441 4.00818H15.5448C16.9876 4.05505 17.2482 4.34005 18.1013 5.64787C18.4988 6.25724 20.4844 9.8713 22.5563 13.7188H16.5404ZM21.8335 22.1994L22.0473 22.5529C23.3598 24.7176 24.3601 26.3788 24.5663 26.5907C25.3416 27.3866 26.4038 26.8907 27.0226 25.9879C27.513 25.3673 27.7857 24.6027 27.7988 23.8119C27.5814 23.2582 27.3274 22.7195 27.0385 22.1994H21.8335ZM3.68257 14.6104C3.21212 14.619 2.76432 14.814 2.43755 15.1526C2.11077 15.4911 1.93173 15.9455 1.93976 16.416V19.5041C1.93541 19.7373 1.97705 19.9691 2.06228 20.1862C2.14752 20.4033 2.2747 20.6014 2.43654 20.7694C2.59838 20.9373 2.79172 21.0717 3.00552 21.1649C3.21932 21.2581 3.44938 21.3083 3.68257 21.3126H26.3176C26.788 21.3039 27.2358 21.1089 27.5626 20.7704C27.8894 20.4318 28.0684 19.9774 28.0604 19.5069V16.416C28.0684 15.9455 27.8894 15.4911 27.5626 15.1526C27.2358 14.814 26.788 14.619 26.3176 14.6104H3.68257ZM3.68257 16.1807H26.3176C26.348 16.1812 26.378 16.1876 26.4059 16.1997C26.4338 16.2118 26.4591 16.2293 26.4802 16.2511C26.5014 16.273 26.518 16.2988 26.5292 16.3271C26.5404 16.3554 26.5459 16.3856 26.5454 16.416V19.5041C26.5459 19.5345 26.5404 19.5647 26.5292 19.593C26.518 19.6213 26.5014 19.6471 26.4802 19.669C26.4591 19.6908 26.4338 19.7083 26.4059 19.7204C26.378 19.7325 26.348 19.7389 26.3176 19.7394H22.6801V18.2488C22.6816 18.1265 22.6346 18.0085 22.5494 17.9206C22.4642 17.8328 22.3477 17.7823 22.2254 17.7801H21.5176C21.3952 17.7823 21.2787 17.8328 21.1936 17.9206C21.1084 18.0085 21.0614 18.1265 21.0629 18.2488V19.7404H15.8082V18.2488C15.8097 18.1265 15.7627 18.0085 15.6775 17.9206C15.5923 17.8328 15.4759 17.7823 15.3535 17.7801H14.6457C14.5234 17.7823 14.4069 17.8328 14.3217 17.9206C14.2365 18.0085 14.1895 18.1265 14.191 18.2488V19.7404H8.93726V18.2488C8.93877 18.1265 8.89179 18.0085 8.8066 17.9206C8.7214 17.8328 8.60491 17.7823 8.48257 17.7801H7.77476C7.65242 17.7823 7.53593 17.8328 7.45074 17.9206C7.36554 18.0085 7.31857 18.1265 7.32007 18.2488V19.7404H3.68257C3.65216 19.7399 3.62215 19.7334 3.59424 19.7213C3.56633 19.7092 3.54108 19.6918 3.51992 19.6699C3.49877 19.648 3.48213 19.6222 3.47095 19.594C3.45976 19.5657 3.45427 19.5355 3.45476 19.5051V16.416C3.45427 16.3856 3.45976 16.3554 3.47095 16.3271C3.48213 16.2988 3.49877 16.273 3.51992 16.2511C3.54108 16.2293 3.56633 16.2118 3.59424 16.1997C3.62215 16.1876 3.65216 16.1812 3.68257 16.1807Z"
        fill="currentColor"
      />
    </svg>
  ),
};
