import { Link } from "next-view-transitions";

const sections = [
  {
    title: "Event",
    links: [
      { name: "Agenda", href: "/agenda" },
      { name: "FAQ", href: "#faq" },
      { name: "Discord", href: "#discord" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Sponsors", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Facebook", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "Community", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <section className="py-8  border-primary border">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0 ">
              <div className="font-bold bg-clip-text text-transparent bg-gradient-to-tr from-primary to-destructive">
                The Event App
              </div>
              <p className="tracking-wider">Events made easy.</p>
            </div>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>
              © {new Date().getFullYear()} Mateusz Kliś. All rights reserved.
            </p>
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <Link href="#"> Terms and Conditions</Link>
              </li>
              <li className="underline hover:text-primary">
                <Link href="#"> Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
