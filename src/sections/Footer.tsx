import { motion } from 'framer-motion';

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/iamawaisgillani',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
      color: 'from-primary to-secondary' // One accent wash for all three
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/syed-muhammad-awais-gillani',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg',
      color: 'from-primary to-secondary' // One accent wash for all three
    },
    {
      name: 'Email',
      url: 'mailto:iamawaisgillani@gmail.com',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', // Using dedicated Gmail icon
      color: 'from-primary to-secondary' // One accent wash for all three
    }
  ];

  const footerColumns: FooterColumn[] = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Scraping', href: '#projects' },
        { name: 'Automation', href: '#projects' },
        { name: 'API Development', href: '#projects' },
        { name: 'Data Processing', href: '#projects' },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Gradient Top Border */}
      <div className="h-px w-full rule-accent opacity-40" />

      {/* Main Footer Content */}
      <div className="relative py-16">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

            {/* Brand Column (Span 4) */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <h3 className="font-display font-bold text-2xl text-foreground tracking-tight">Awais Gillani</h3>
                  <p className="text-sm text-primary font-medium mt-1">AI & Python Developer</p>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
                  Building intelligent automation systems and web solutions that make a difference.
                  Let's create something amazing together.
                </p>
              </motion.div>
            </div>

            {/* Navigation & Services (Span 2 each) */}
            {footerColumns.map((column, columnIndex) => (
              <motion.div
                key={column.title}
                className="lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (columnIndex + 1) }}
              >
                <h4 className="font-sans font-semibold text-sm text-foreground uppercase tracking-widest mb-6">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        onClick={(e) => {
                          if (!link.external && link.href.startsWith('#')) {
                            e.preventDefault();
                            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-colors duration-300" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Connect Column (Span 4) - Official Icons */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-sans font-semibold text-sm text-foreground uppercase tracking-widest mb-6">
                Connect
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-tint border border-hairline overflow-hidden transition-all duration-300 hover:border-hairline-strong hover:shadow-lg hover:shadow-primary/10"
                  >
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-25 transition-opacity duration-300`} />

                    <img
                      src={social.icon}
                      alt={social.name}
                      loading="lazy"
                      decoding="async"
                      className="w-7 h-7 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                Feel free to reach out for collaborations or just a friendly hello.
              </p>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
          >
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} <span className="text-foreground font-medium">Syed Muhammad Awais Gillani</span>.
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
