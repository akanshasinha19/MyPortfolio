import Image from "next/image"
import Link from "next/link"
import { ArrowRight, FileText, Github, Linkedin, Mail, MapPin, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Alex Morgan</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#experience" className="transition-colors hover:text-foreground/80">
                Experience
              </Link>
              <Link href="#contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Hero Section */}
        <section id="about" className="py-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div>
                <Badge className="mb-2">Available for Work</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Alex Morgan</h1>
                <p className="text-xl text-muted-foreground">Senior Product Manager</p>
              </div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                I'm a product manager with 7+ years of experience building digital products that users love. I
                specialize in user-centered design, agile methodologies, and data-driven decision making.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild>
                  <Link href="#projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/resume.pdf" target="_blank">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="mailto:alex@example.com" className="text-muted-foreground hover:text-foreground">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] overflow-hidden rounded-full border-4 border-background bg-muted md:h-[400px] md:w-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Alex Morgan"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-8 md:py-12">
          <h2 className="mb-6 md:mb-8 text-2xl font-bold tracking-tight">My Skills & Expertise</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Product Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Market Research</li>
                  <li>Competitive Analysis</li>
                  <li>Product Roadmapping</li>
                  <li>Go-to-Market Planning</li>
                  <li>Product Lifecycle Management</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Agile & Scrum</li>
                  <li>JIRA & Confluence</li>
                  <li>SQL & Data Analysis</li>
                  <li>Wireframing & Prototyping</li>
                  <li>A/B Testing</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="sm:col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Cross-functional Team Leadership</li>
                  <li>Stakeholder Management</li>
                  <li>Product Team Mentoring</li>
                  <li>Executive Communication</li>
                  <li>Product Vision Setting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-8 md:py-12">
          <h2 className="mb-6 md:mb-8 text-2xl font-bold tracking-tight">Featured Projects</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full overflow-x-auto">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="saas">SaaS</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="saas" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter((p) => p.category === "SaaS")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="mobile" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter((p) => p.category === "Mobile")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="enterprise" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter((p) => p.category === "Enterprise")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-8 md:py-12">
          <h2 className="mb-6 md:mb-8 text-2xl font-bold tracking-tight">Work Experience</h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="w-fit">{job.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-8 md:py-12">
          <h2 className="mb-6 md:mb-8 text-2xl font-bold tracking-tight">Get In Touch</h2>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Feel free to reach out for opportunities or just to say hello!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a href="mailto:alex@example.com" className="hover:underline break-all">
                  alex@example.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a
                  href="https://linkedin.com/in/alexmorgan"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline break-all"
                >
                  linkedin.com/in/alexmorgan
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span>San Francisco, CA (Open to Remote)</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href="mailto:alex@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </a>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Alex Morgan. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="mailto:alex@example.com" className="text-muted-foreground hover:text-foreground">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project }) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
          <Badge className="whitespace-nowrap">{project.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild variant="outline" className="w-full">
          <Link href={project.link}>
            View Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample Data
const projects = [
  {
    title: "FinTech Dashboard Redesign",
    description:
      "Led the complete redesign of a financial analytics dashboard, increasing user engagement by 45% and reducing customer support tickets by 30%.",
    image: "/placeholder.svg?height=400&width=600",
    category: "SaaS",
    link: "/projects/fintech-dashboard",
  },
  {
    title: "Health & Wellness Mobile App",
    description:
      "Managed the development of a health tracking mobile application from concept to launch, achieving 100,000+ downloads in the first quarter.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Mobile",
    link: "/projects/health-app",
  },
  {
    title: "Enterprise Resource Planning System",
    description:
      "Oversaw the implementation of a custom ERP solution for a Fortune 500 company, resulting in 25% operational efficiency improvement.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Enterprise",
    link: "/projects/erp-system",
  },
  {
    title: "E-commerce Platform Optimization",
    description:
      "Spearheaded the optimization of an e-commerce platform, implementing A/B testing that increased conversion rates by 18%.",
    image: "/placeholder.svg?height=400&width=600",
    category: "SaaS",
    link: "/projects/ecommerce-optimization",
  },
  {
    title: "Logistics Mobile Solution",
    description:
      "Developed a mobile solution for logistics management, reducing delivery times by 22% and improving customer satisfaction scores.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Mobile",
    link: "/projects/logistics-app",
  },
  {
    title: "Data Analytics Platform",
    description:
      "Led the product strategy for an enterprise data analytics platform serving over 200 corporate clients across various industries.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Enterprise",
    link: "/projects/data-analytics",
  },
]

const experience = [
  {
    title: "Senior Product Manager",
    company: "TechCorp Inc.",
    period: "2021 - Present",
    location: "San Francisco, CA",
    achievements: [
      "Led a cross-functional team of 15 to deliver a new SaaS platform that generated $2M in revenue in its first year",
      "Implemented agile methodologies that reduced development cycle time by 30%",
      "Developed and executed product roadmap aligned with company's strategic goals",
      "Conducted user research and competitive analysis to identify market opportunities",
    ],
  },
  {
    title: "Product Manager",
    company: "InnovateSoft",
    period: "2018 - 2021",
    location: "New York, NY",
    achievements: [
      "Managed the development and launch of 3 successful mobile applications with combined 500K+ downloads",
      "Increased user retention by 40% through data-driven product improvements",
      "Collaborated with engineering, design, and marketing teams to ensure product-market fit",
      "Created detailed product specifications and user stories for development team",
    ],
  },
  {
    title: "Associate Product Manager",
    company: "GlobalTech Solutions",
    period: "2016 - 2018",
    location: "Boston, MA",
    achievements: [
      "Assisted in the development of product strategy for enterprise software solutions",
      "Conducted market research and user interviews to inform product decisions",
      "Managed backlog prioritization and sprint planning with development team",
      "Created and maintained product documentation and user guides",
    ],
  },
]
