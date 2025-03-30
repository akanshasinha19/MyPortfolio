"use client"

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {caseStudyContent} from "@/app/caseStudy"; // Importing case study content

// Sample case study content (in real app, this would likely be fetched from a CMS or API)


const projects = [
  {
    title: "E-commerce Marketplace Integration",
    description:
      "Led the Shopify & Amazon integration at Santo Remedio, resulting in $2.6M revenue growth and a 35% increase in the customer base.",
    image: "/santo_remedio.png?height=400&width=600",
    category: "E-commerce",
    link: "ecommerce-integration",
    type: "CaseStudy",
  },
  {
    title: "Recommendation Engine for Product Boost",
    description:
      "Developed a recommendation engine using Association Rules, processing 500K+ daily user interactions and increasing AOV from $63 to $64.29.",
    image: "/medicine.webp?height=400&width=600",
    category: "E-commerce",
    link: "recommendation-engine",
    type: "CaseStudy",
  },
  {
    title: "Real-time Analytics Dashboard",
    description:
      "Built ETL pipelines and a BigQuery + Tableau dashboard to process 5GB of daily data, reducing decision-making time from 10 hours to 30 minutes.",
    image: "/data_analytics.jpeg?height=400&width=600",
    category: "Data Analytics",
    link: "real-time-dashboard",
    type: "CaseStudy",
  },
  {
    title: "Blue Bike Usage Dashboard",
    description:
      "Created an interactive Tableau dashboard analyzing real-time usage trends for Blue Bikes, improving operational efficiency by 29%.",
    image: "/bluebikes.png?height=400&width=600",
    category: "Data Visualization",
    link: "/bluebikes.pdf",
  },
  {
    title: "Neural Network for Loan Prediction",
    description:
      "Designed a neural network to predict personal loan approvals with 97.2% test accuracy, visualized via confusion matrices and model diagrams.",
    image: "/neural_net.avif?height=400&width=600",
    category: "Machine Learning",
    link: "loan-prediction",
    type: "CaseStudy",
  },
  {
    title: "Clustering Salary & Benefits Data",
    description:
      "Used k-means and hierarchical clustering for public employee salary analysis; results visualized with Elbow charts, scatterplots, and dendrograms.",
    image: "/clustering.png?height=400&width=600",
    category: "Machine Learning",
    link: "salary-clustering",
    type: "CaseStudy",
  },
  {
    title: "Olist E-commerce Insights Dashboard",
    description:
      "Built a Tableau dashboard analyzing order volume, payment preferences, and customer satisfaction across Brazil. Revealed regional disparities in delivery delays and helped optimize logistics strategies.",
    image: "/olist.jpeg?height=400&width=600",
    category: "Data Visualization",
    link: "/olist.pdf",
  },
  {
    title: "Champion Customer Segmentation",
    description:
      "Performed RFM analysis using SAS on 20K+ customers for Champion's DTC channel. Identified 5 segments and proposed targeted retention and marketing strategies based on CLV and engagement.",
    image: "/champion.png?height=400&width=600",
    category: "Marketing Analytics",
    link: "/behave.pdf",
  },
  {
    title: "GoDaddy Predictive Modeling",
    description:
      "Built a CART model to predict GoDaddy's product likeness using advanced tuning and pruning. Achieved a MAPE of 10.67%, driving actionable insights for pricing and marketing decisions.",
    image: "/godaddy.png?height=400&width=600",
    category: "Machine Learning",
    link: "/godaddy.pdf",
  },
  {
    title: "NYT Topic Modeling with NLP",
    description:
      "Applied LDA topic modeling and text preprocessing on New York Times comments to identify themes and sentiment trends across reader discussions using Python and NLP techniques.",
    image: "/NLP.jpeg?height=400&width=600",
    category: "Natural Language Processing",
    link: "/NLP.pdf",
  },
  {
    title: "NYT Comment Scraper",
    description:
      "Developed a Python-based web scraper using BeautifulSoup and Selenium to extract NYT comments for NLP analysis. Managed dynamic content loading and anti-scraping challenges.",
    image: "/beautifulsoup.png?height=400&width=600",
    category: "Web Scraping",
    link: "/WebScraping.pdf",
  },
  {
    title: "Sentiment Analysis Using VADER (Harris vs. Trump)",
    description:
      "Analyzed tweet sentiment for Kamala Harris and Donald Trump using VADER, BERT, Flair, and TextBlob. Found that negative tweets drove the most engagement across both figures.",
    image: "/sentiment.jpeg?height=400&width=600",
    category: "Sentiment Analysis",
    link: "/sentiment.pdf",
  },
];

const experience = [
  {
    title: "Product Manager",
    company: "Santo Remedio,India",
    period: "Aug 2022 - Aug 2024 (2 years)",

    about:
      "A leading Latin-American wellness brand expanding into DTC digital commerce.",
    achievements: [
      "Spearheaded cross-functional team of 12 to develop and execute e-commerce product strategy for Shopify and Amazon integration, driving $2.6M in revenue and 35% growth in customer base.",
      "Implemented attribution modeling across 5 marketing channels, lowering CAC from $75 to $63 and improving LTV/CAC from 1.7 to 1.9.",
      "Led ETL pipeline development and built real-time analytics dashboard using BigQuery and Tableau, reducing decision-making time from 10 hours to 30 minutes.",
      "Constructed a recommendation engine using Association Rules, handling 500K+ daily user interactions and increasing AOV from $63 to $64.29.",
      "Developed A/B testing framework and executed 9 tests, launching 4 features and improving conversion by 10% (2.2% to 2.42%).",
    ],
  },
  {
    title: "Senior Data Analyst",
    company: "UNA Brands,India",
    period: "Sep 2021 - Jul 2022 (1 year)",
    about:
      "A fast-growing e-commerce aggregator acquiring and scaling DTC brands across Asia.",
    achievements: [
      "Directed a team of 5 to architect a Unified Data Ecosystem using Celigo and PostgreSQL, reducing onboarding time for acquired brands by over 90%.",
      "Defined KPIs, OKRs, and facilitated weekly sprints within a Scrum framework; authored PRDs to align cross-functional teams.",
      "Deployed Jira for backlog and roadmap visibility, resulting in 30% improvement in project delivery time.",
      "Achieved 24% product performance gain by leading UAT with stakeholders and prioritizing data-driven enhancements.",
    ],
  },
  {
    title: "Project Team Lead",
    company: "NxtSuite Technologies,India",
    period: "Apr 2020 - Sep 2021 (1.3 years)",

    about:
      "A cloud consulting firm specializing in ERP and integration solutions for SMEs.",
    achievements: [
      "Managed 15 clients, leading end-to-end implementation of Order-to-Cash, Procure-to-Pay, and Inventory modules using Celigo and NetSuite ERP.",
      "Led a team of 5 engineers to integrate NetSuite with third-party APIs, boosting operational efficiency by 40% and driving $200K in revenue.",
      "Introduced Power BI-based Project Health Check (PHC) report to improve billing and resource allocation by 15%.",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Infosys, India and China",
    period: "Nov 2016 - Mar 2020 (4 years)",

    about:
      "A global technology consulting company serving Fortune 500 clients worldwide.",
    achievements: [
      "Architected SAP-PI solutions to support Lonza’s operations in 40+ EMEA and APAC regions.",
      "Presented strategic recommendations to leadership, securing $1M in additional funding for European expansion.",
    ],
  },
];

export default function Portfolio() {
  const [openCaseStudy, setOpenCaseStudy] = useState(null);

  // Function to handle opening a case study
  const handleOpenCaseStudy = (projectId) => {
    setOpenCaseStudy(projectId);
  };

  // Function to handle closing a case study
  const handleCloseCaseStudy = () => {
    setOpenCaseStudy(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Akansha Sinha</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="#about"
                className="transition-colors hover:text-foreground/80"
              >
                About
              </Link>
              <Link
                href="#projects"
                className="transition-colors hover:text-foreground/80"
              >
                Projects
              </Link>
              <Link
                href="#experience"
                className="transition-colors hover:text-foreground/80"
              >
                Experience
              </Link>
              <Link
                href="#contact"
                className="transition-colors hover:text-foreground/80"
              >
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Akansha Sinha
                </h1>
                <p className="text-xl text-muted-foreground">Product Manager</p>
              </div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                I’m a product manager and analytics leader with 8 years of
                experience across e-commerce, tech consulting, and data
                strategy. I specialize in data-driven product development,
                cross-functional leadership, and building scalable solutions.
                Currently pursuing my MS in Business Analytics at Babson
                College.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild>
                  <Link href="#projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/Resume.pdf" target="_blank">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Resume
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="https://www.linkedin.com/in/akanshasinha19/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://github.com/akanshasinha19/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="mailto:akansha.akg19@gmail.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] overflow-hidden rounded-full border-4 border-background bg-muted md:h-[400px] md:w-[400px]">
                <Image
                  src="/akansha.PNG?height=400&width=400"
                  alt="Akansha Sinha"
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
          <h2 className="mb-6 md:mb-8 text-2xl font-bold tracking-tight">
            My Skills & Expertise
          </h2>
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
          <h2 className="mb-6 md:mb-8 text-2xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full overflow-x-auto">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="ecom">E-commerce</TabsTrigger>
              <TabsTrigger value="dta">Data Analytics</TabsTrigger>
              <TabsTrigger value="mkt">Marketing Analytics</TabsTrigger>
              <TabsTrigger value="ml">Machine Learning</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={index} 
                    project={project} 
                    onOpenCaseStudy={handleOpenCaseStudy}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="ecom" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter((p) => p.category === "E-commerce")
                  .map((project, index) => (
                    <ProjectCard 
                      key={index} 
                      project={project} 
                      onOpenCaseStudy={handleOpenCaseStudy}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="dta" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter(
                    (p) =>
                      p.category === "Data Analytics" ||
                      p.category === "Data Visualization",
                  )
                  .map((project, index) => (
                    <ProjectCard 
                      key={index} 
                      project={project} 
                      onOpenCaseStudy={handleOpenCaseStudy}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="mkt" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter((p) => p.category === "Marketing Analytics")
                  .map((project, index) => (
                    <ProjectCard 
                      key={index} 
                      project={project} 
                      onOpenCaseStudy={handleOpenCaseStudy}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="ml" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter(
                    (p) =>
                      p.category === "Machine Learning" ||
                      p.category === "Natural Language Processing",
                  )
                  .map((project, index) => (
                    <ProjectCard 
                      key={index} 
                      project={project} 
                      onOpenCaseStudy={handleOpenCaseStudy}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-8 md:py-12">
          <h2 className="mb-6 md:mb-8 text-2xl font-bold tracking-tight">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <Card key={index}>
                <CardHeader style={{ "padding-bottom": "10px;" }}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription className="text-base">
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {job.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <div className="italic text-base text-muted-foreground">
                      {job.about}
                    </div>
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
          <h2 className="mb-6 md:mb-8 text-2xl font-bold tracking-tight">
            Get In Touch
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Feel free to reach out for opportunities or just to say hello!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a
                  href="mailto:akansha.akg19@gmail.com"
                  className="hover:underline break-all"
                >
                  akansha.akg19@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a
                  href="https://www.linkedin.com/in/akanshasinha19/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline break-all"
                >
                  https://www.linkedin.com/in/akanshasinha19/
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span>Boston, MA (Open to Remote)</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href="mailto:akansha.akg19@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </a>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      {/* Case Study Modal */}
      <Dialog open={!!openCaseStudy} onOpenChange={() => openCaseStudy && handleCloseCaseStudy()}>
        <DialogContent className="max-w-full max-h-full w-full h-[100vh] p-0 m-0 overflow-hidden border-none">
          {openCaseStudy && (
            <>
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                <DialogTitle className="text-xl font-bold">
                  {projects.find(p => p.link === openCaseStudy || p.link.endsWith(openCaseStudy))?.title || 'Case Study'}
                </DialogTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleCloseCaseStudy}
                  className="rounded-full"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              
              <div className="h-[calc(100vh-64px)] overflow-y-auto px-4 md:px-8 lg:px-0">
                <div className="prose prose-sm md:prose-lg dark:prose-invert mx-auto py-8 max-w-2xl lg:max-w-3xl">
                  <ReactMarkdown>
                    {caseStudyContent[openCaseStudy]}
                  </ReactMarkdown>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Akansha Sinha. All rights reserved.
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
              href="https://github.com/akanshasinha19/"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="mailto:akansha.akg19@gmail.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Project Card Component
function ProjectCard({project, onOpenCaseStudy }) {
  const handleClick = () => {
    if (project.type === "CaseStudy") {
      // Extract project ID from the link
      
      const projectId = project.link.split('/').pop();
      console.log("Project ID:", projectId);
      if(!caseStudyContent.hasOwnProperty(projectId)) {
        return;
      }

      onOpenCaseStudy(projectId);
    } else {
      // For non-case study projects, do nothing here as the Link component will handle navigation
      return;
    }
  };

  return (
    <Card className="relative overflow-hidden flex flex-col">
      {/* Category Badge in Top-Right */}
      <Badge className="absolute top-2 right-2 z-10">{project.category}</Badge>

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
        <CardTitle className="text-base font-semibold line-clamp-2">
          {project.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="mt-auto">
        {project.type === "CaseStudy" ? (
          <Button onClick={handleClick} variant="outline" className="w-full">
            View Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full">
            <Link href={project.link} target="_blank">
              View Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
