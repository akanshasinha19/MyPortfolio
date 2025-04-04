import { experience, projects, caseStudyContent } from "@/app/caseStudy";

interface AgentResult {
  isRelevant: boolean;
  answer?: string;
  confidence: number;
  metadata?: {
    source: string;
    type: 'experience' | 'project' | 'case-study' | 'education';
  };
}

/**
 * Experience Agent that processes queries related to professional experience
 */
export class ExperienceAgent {
  /**
   * Check if a query is related to professional experience
   * @returns Boolean indicating if the query is experience-related
   */
  public isExperienceQuery(query: string): boolean {
    const query_lower = query.toLowerCase();
    
    // Keywords that indicate the query is about professional experience or education
    const experienceKeywords = [
      'experience', 'work', 'job', 'career', 'position', 'role',
      'company', 'employment', 'profession', 'occupation', 'industry',
      'worked', 'working', 'employer', 'colleague', 'team',
      'professional', 'background', 'history', 'resume', 'cv',
      'responsibility', 'achievement', 'accomplishment', 'skill',
      'project', 'development', 'management', 'lead', 'analysis',
      'santo remedio', 'una brands', 'nxtsuite', 'infosys',
      'product manager', 'data analyst', 'engineer',
      // Education keywords
      'education', 'study', 'degree', 'college', 'university',
      'school', 'student', 'graduate', 'undergraduate', 'masters',
      'mba', 'phd', 'certificate', 'certification', 'course',
      'major', 'minor', 'babson', 'ms', 'business analytics'
    ];
    
    return experienceKeywords.some(keyword => query_lower.includes(keyword));
  }
  
  /**
   * Process a query to find experience-related information
   * @param query The user query
   * @returns Results object with answer and metadata
   */
  public processQuery(query: string): AgentResult {
    const query_lower = query.toLowerCase();
    
    if (!this.isExperienceQuery(query)) {
      return { isRelevant: false, confidence: 0 };
    }

    // Check for education-related queries first
    if (this.isEducationQuery(query_lower)) {
      return {
        isRelevant: true,
        answer: this.getEducationInformation(query_lower),
        confidence: 0.95,
        metadata: {
          source: 'education-info',
          type: 'education'
        }
      };
    }

    // First check for company-specific queries
    for (const job of experience) {
      const company_lower = job.company.toLowerCase();
      if (query_lower.includes(company_lower)) {
        return {
          isRelevant: true,
          answer: this.formatExperienceAnswer(job),
          confidence: 0.9,
          metadata: {
            source: job.company,
            type: 'experience'
          }
        };
      }
    }
    
    // Check for role-specific queries
    for (const job of experience) {
      const title_lower = job.title.toLowerCase();
      if (query_lower.includes(title_lower)) {
        return {
          isRelevant: true,
          answer: this.formatExperienceAnswer(job),
          confidence: 0.8,
          metadata: {
            source: job.title,
            type: 'experience'
          }
        };
      }
    }
    
    // Check for project-specific queries
    for (const project of projects) {
      const project_lower = project.title.toLowerCase();
      if (query_lower.includes(project_lower)) {
        // If it's a case study, include detailed information
        if (project.type === 'CaseStudy' && project.link) {
          const caseStudy = caseStudyContent[project.link as keyof typeof caseStudyContent];
          if (caseStudy) {
            return {
              isRelevant: true,
              answer: `Here's information about the ${project.title} project:\n\n${project.description}\n\nDetailed case study:\n${this.summarizeCaseStudy(caseStudy)}`,
              confidence: 0.95,
              metadata: {
                source: project.title,
                type: 'case-study'
              }
            };
          }
        }
        
        return {
          isRelevant: true,
          answer: `Here's information about the ${project.title} project:\n\n${project.description}`,
          confidence: 0.85,
          metadata: {
            source: project.title,
            type: 'project'
          }
        };
      }
    }
    
    // Check for general experience queries
    if (query_lower.includes('experience') || 
        query_lower.includes('work history') || 
        query_lower.includes('background')) {
      return {
        isRelevant: true,
        answer: this.generateExperienceSummary(),
        confidence: 0.75,
        metadata: {
          source: 'experience-summary',
          type: 'experience'
        }
      };
    }
    
    // Check for project queries
    if (query_lower.includes('project') || 
        query_lower.includes('portfolio') || 
        query_lower.includes('case study')) {
      return {
        isRelevant: true,
        answer: this.generateProjectsSummary(),
        confidence: 0.75,
        metadata: {
          source: 'projects-summary',
          type: 'project'
        }
      };
    }

    // For other experience-related queries where we don't have a specific match
    return {
      isRelevant: true,
      answer: this.generateGenericExperienceAnswer(),
      confidence: 0.6,
      metadata: {
        source: 'generic-experience',
        type: 'experience'
      }
    };
  }
  
  /**
   * Check if a query is related to education
   */
  private isEducationQuery(query_lower: string): boolean {
    const educationKeywords = [
      'education', 'study', 'studying', 'student', 'degree', 'university', 
      'college', 'school', 'graduate', 'undergrad', 'masters', 'ms', 
      'mba', 'phd', 'babson', 'course'
    ];
    
    // Check for education-specific question patterns
    const educationPatterns = [
      /where (did|does|is|has) .* study/i,
      /what .* study/i,
      /where .* go to (college|university|school)/i,
      /what (college|university|school) .* attend/i,
      /what .* degree/i,
      /education background/i,
    ];
    
    // Check for keyword matches
    const hasEducationKeyword = educationKeywords.some(keyword => 
      query_lower.includes(keyword)
    );
    
    // Check for pattern matches
    const matchesPattern = educationPatterns.some(pattern => 
      pattern.test(query_lower)
    );
    
    return hasEducationKeyword || matchesPattern;
  }
  
  /**
   * Provide information about Akansha's education
   */
  private getEducationInformation(query_lower: string): string {
    let response = `## Education\n\nAkansha is currently pursuing her MS in Business Analytics at Babson College. `;
    
    // Add more details based on specific question types
    if (query_lower.includes("babson")) {
      response += `Babson College is a private business school in Wellesley, Massachusetts, known for its focus on entrepreneurship education. She chose Babson for its strong analytics program and entrepreneurial focus.`;
    } else if (query_lower.includes("when") || query_lower.includes("year")) {
      response += `She started her master's program in 2023 and is expected to graduate in 2025. Before this, she completed her undergraduate degree in Engineering.`;
    } else if (query_lower.includes("why") || query_lower.includes("reason")) {
      response += `She chose to pursue an MS in Business Analytics to enhance her data-driven product management skills and gain deeper expertise in analytics that she can apply to solve complex business problems.`;
    } else if (query_lower.includes("course") || query_lower.includes("class")) {
      response += `Her coursework includes:\n\n- Data visualization\n- Machine learning\n- Business intelligence\n- Statistical modeling\n- Analytics strategy\n\nShe's particularly interested in applying these skills to solve real-world business problems.`;
    } else {
      response += `She's focusing on advanced analytics and data-driven product management. Before this, she completed her undergraduate degree in Engineering, which provided a strong technical foundation for her career.`;
    }
    
    return response;
  }
  
  /**
   * Format an experience item into a readable answer
   */
  private formatExperienceAnswer(job: typeof experience[0]): string {
    const achievements = job.achievements.map(a => `- ${a}`).join('\n');
    
    return `
## Experience at ${job.company}

**Role:** ${job.title}  
**Period:** ${job.period}

### About the company
${job.about}

### Key achievements
${achievements}
`.trim();
  }
  
  /**
   * Generate a summary of all experience
   */
  private generateExperienceSummary(): string {
    return `
## Professional Experience

Akansha has a diverse professional background with over 8 years of experience. Her career includes:

${experience.map(job => `- **${job.title}** at ${job.company} (${job.period})`).join('\n')}

Her most recent role was Product Manager at Santo Remedio, where she led e-commerce integrations and data analytics initiatives. Would you like more details about any specific role?
`.trim();
  }
  
  /**
   * Generate a summary of projects
   */
  private generateProjectsSummary(): string {
    const highlightedProjects = projects.slice(0, 3); // Just top 3 projects
    
    return `
## Notable Projects

Akansha has worked on several notable projects, including:

${highlightedProjects.map(project => `### ${project.title}\n\n${project.description}`).join('\n\n')}

Would you like more information about any specific project?
`.trim();
  }
  
  /**
   * Generate a generic answer for experience-related queries
   */
  private generateGenericExperienceAnswer(): string {
    return `
## Akansha's Professional Background

Akansha has over 8 years of experience in product management and data analytics. She has worked at companies like:

- **Santo Remedio** - Product Manager
- **UNA Brands** - Senior Data Analyst
- **NxtSuite Technologies** - Project Team Lead
- **Infosys** - Senior Software Engineer

Her expertise includes e-commerce platform integration, data pipeline development, recommendation systems, and analytics dashboards. She's skilled in tools like Tableau, BigQuery, NetSuite, Celigo, and various project management methodologies.

Would you like to know more about her specific roles, projects, or technical skills?
`.trim();
  }
  
  /**
   * Extract key points from a case study for a concise summary
   */
  private summarizeCaseStudy(caseStudy: string): string {
    // Extract sections from markdown
    const situationMatch = caseStudy.match(/## Situation\s+([\s\S]*?)(?=##|$)/);
    const resultMatch = caseStudy.match(/## Result\s+([\s\S]*?)(?=##|$)/);
    
    const situation = situationMatch ? situationMatch[1].trim() : '';
    const result = resultMatch ? resultMatch[1].trim() : '';
    
    return `### Situation\n${situation.slice(0, 200)}...\n\n### Result\n${result.slice(0, 200)}...\n\n*(This is a summary. Ask for more details if needed.)*`;
  }
}

export const experienceAgent = new ExperienceAgent();
export default experienceAgent;
