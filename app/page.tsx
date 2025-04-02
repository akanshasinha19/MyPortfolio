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
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

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

import {caseStudyContent, projects, experience} from "@/app/caseStudy"; // Importing case study content
import ThreeBackground from "@/components/ThreeBackground"; // Import the 3D background
import ChatBot from "@/components/ChatBot"; // Import the ChatBot component

// Import necessary components for better markdown rendering
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  }
};

export default function Portfolio() {
  const [openCaseStudy, setOpenCaseStudy] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Function to handle opening a case study
  const handleOpenCaseStudy = (projectId) => {
    setOpenCaseStudy(projectId);
  };

  // Function to handle closing a case study
  const handleCloseCaseStudy = () => {
    setOpenCaseStudy(null);
  };

  // Add scroll listener effect for header animations
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with animation */}
      <motion.header 
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: hasScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s ease"
        }}
      >
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
      </motion.header>

      <main className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Hero Section with animations */}
        <section id="about" className="py-8 md:py-16 relative">
          {/* Add the animated background */}
          <ThreeBackground className="opacity-50" />
          
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center relative z-0">
            <motion.div 
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] overflow-hidden rounded-full border-4 border-background bg-muted md:h-[400px] md:w-[400px]"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/akansha.PNG?height=400&width=400"
                  alt="Akansha Sinha"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section with animations */}
        <motion.section 
          className="py-8 md:py-12 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="mb-6 md:mb-8 text-2xl font-bold tracking-tight"
            variants={itemVariants}
          >
            My Skills & Expertise
          </motion.h2>
          
          {/* Add the 3D skill globe */}
          
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {/* Wrap each Card in motion.div */}
            <motion.div variants={itemVariants}>
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
            </motion.div>
            <motion.div variants={itemVariants}>
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
            </motion.div>
            <motion.div variants={itemVariants}>
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
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section with animations */}
        <motion.section 
          id="projects" 
          className="py-8 md:py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="mb-6 md:mb-8 text-2xl font-bold tracking-tight"
            variants={itemVariants}
          >
            Featured Projects
          </motion.h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 w-full overflow-x-auto">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="ecom">E-commerce</TabsTrigger>
              <TabsTrigger value="dta">Data Analytics</TabsTrigger>
              <TabsTrigger value="mkt">Marketing Analytics</TabsTrigger>
              <TabsTrigger value="ml">Machine Learning</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6">
              <motion.div 
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects.map((project, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <ProjectCard 
                      project={project} 
                      onOpenCaseStudy={handleOpenCaseStudy}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="ecom" className="space-y-6">
              <motion.div 
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects
                  .filter((p) => p.category === "E-commerce")
                  .map((project, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <ProjectCard 
                        project={project} 
                        onOpenCaseStudy={handleOpenCaseStudy}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="dta" className="space-y-6">
              <motion.div 
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects
                  .filter(
                    (p) =>
                      p.category === "Data Analytics" ||
                      p.category === "Data Visualization",
                  )
                  .map((project, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <ProjectCard 
                        project={project} 
                        onOpenCaseStudy={handleOpenCaseStudy}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="mkt" className="space-y-6">
              <motion.div 
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects
                  .filter((p) => p.category === "Marketing Analytics")
                  .map((project, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <ProjectCard 
                        project={project} 
                        onOpenCaseStudy={handleOpenCaseStudy}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="ml" className="space-y-6">
              <motion.div 
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects
                  .filter(
                    (p) =>
                      p.category === "Machine Learning" ||
                      p.category === "Natural Language Processing" ||
                      p.category === "Web Scraping" ||
                      p.category === "Sentiment Analysis"
                      ,
                  )
                  .map((project, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <ProjectCard 
                        project={project} 
                        onOpenCaseStudy={handleOpenCaseStudy}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Experience Section with animations */}
        <motion.section 
          id="experience" 
          className="py-8 md:py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="mb-6 md:mb-8 text-2xl font-bold tracking-tight"
            variants={itemVariants}
          >
            Work Experience
          </motion.h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
              >
                <Card>
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
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section with animations */}
        <motion.section 
          id="contact" 
          className="py-8 md:py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="mb-6 md:mb-8 text-2xl font-bold tracking-tight"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.div variants={itemVariants}>
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
          </motion.div>
        </motion.section>
      </main>

      {/* Case Study Modal with animations */}
      <Dialog open={!!openCaseStudy} onOpenChange={() => openCaseStudy && handleCloseCaseStudy()}>
        <DialogContent className="max-w-full max-h-full w-full h-[100vh] p-0 m-0 overflow-hidden border-none">
          {openCaseStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
                <div className="mx-auto py-8 max-w-2xl lg:max-w-3xl">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-6 mt-10 border-b pb-2" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mb-3 mt-6" {...props} />,
                      h4: ({ node, ...props }) => <h4 className="text-xl font-semibold mb-2 mt-4" {...props} />,
                      h5: ({ node, ...props }) => <h5 className="text-lg font-semibold mb-1 mt-3" {...props} />,
                      h6: ({ node, ...props }) => <h6 className="text-md font-semibold mb-1 mt-2" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                      li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a className="text-blue-600 hover:underline" {...props} />
                      ),
                      img: ({ node, ...props }) => (
                        <img className="max-w-full h-auto my-4 rounded-md" {...props} />
                      ),
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={nord}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-md my-4"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-gray-100 dark:bg-gray-800 rounded-md px-1.5 py-0.5" {...props}>
                            {children}
                          </code>
                        );
                      },
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full border-collapse border border-gray-300" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
                      tbody: ({ node, ...props }) => <tbody {...props} />,
                      tr: ({ node, ...props }) => <tr className="border-b border-gray-300" {...props} />,
                      th: ({ node, ...props }) => (
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props} />
                      ),
                      td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                      hr: ({ node, ...props }) => <hr className="my-6 border-t border-gray-300" {...props} />
                    }}
                  >
                    {caseStudyContent[openCaseStudy]}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add the ChatBot component */}
      <ChatBot />
      
      {/* Footer with animations */}
      <motion.footer 
        className="border-t py-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.footer>
    </div>
  );
}

// Project Card Component with animations
function ProjectCard({project, onOpenCaseStudy }) {
  const handleClick = () => {
    if (project.type === "CaseStudy") {
      const projectId = project.link.split('/').pop();
      if(!caseStudyContent.hasOwnProperty(projectId)) {
        return;
      }
      onOpenCaseStudy(projectId);
    } else {
      return;
    }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden flex flex-col h-full">
        <Badge className="absolute top-2 right-2 z-10">{project.category}</Badge>

        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-all group-hover:scale-105"
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
            <motion.div whileTap={{ scale: 0.97 }} className="w-full">
              <Button onClick={handleClick} variant="outline" className="w-full">
                View Case Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div whileTap={{ scale: 0.97 }} className="w-full">
              <Button asChild variant="outline" className="w-full">
                <Link href={project.link} target="_blank">
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
