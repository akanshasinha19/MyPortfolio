/**
 * Utility functions for text processing
 */
import { projects, experience } from "@/app/caseStudy";
import { experienceAgent } from "./experienceAgent";

// Define pre-defined QA pairs based on portfolio content
interface QAPair {
  keywords: string[];
  question: string;
  answer: string;
}

// Create a database of questions and answers about projects and experience
export const qaDatabase: QAPair[] = [
  // Project-related questions
  {
    keywords: ["marketplace", "integration", "shopify", "amazon", "santo remedio"],
    question: "Tell me about the e-commerce marketplace integration project",
    answer: "I led Santo Remedio's integration with Shopify & Amazon, implementing real-time connections with our NetSuite ERP. This expansion generated $2.6M in additional revenue over two years and increased our customer base by 40%. The project required extensive cross-functional collaboration and technical planning to ensure seamless order processing and inventory management across platforms."
  },
  {
    keywords: ["recommendation", "engine", "product", "boost", "aov"],
    question: "What was the recommendation engine project?",
    answer: "I developed a recommendation engine using Association Rule Mining that processed over 500K daily user interactions. This system analyzed co-purchase patterns to suggest relevant products across the customer journey. The implementation increased our Average Order Value from $63 to $64.29 and created a foundation for more sophisticated personalization features."
  },
  {
    keywords: ["analytics", "dashboard", "real-time", "tableau", "bigquery"],
    question: "Can you explain the analytics dashboard project?",
    answer: "I built ETL pipelines and a real-time analytics dashboard using BigQuery and Tableau that processed 5GB of daily data from various sources including NetSuite, Shopify, and ad platforms. This centralized view reduced decision-making time from 10 hours to just 30 minutes and empowered teams to make data-driven decisions across marketing, operations, and executive levels."
  },
  {
    keywords: ["blue bike", "dashboard", "tableau", "usage"],
    question: "What was the Blue Bike project about?",
    answer: "I created an interactive Tableau dashboard analyzing real-time usage trends for Blue Bikes. This visualization tool helped identify peak usage times, popular routes, and maintenance needs, improving operational efficiency by 29%."
  },
  
  // Experience-related questions
  {
    keywords: ["santo remedio", "product manager", "experience"],
    question: "What did you do as a Product Manager at Santo Remedio?",
    answer: "At Santo Remedio, I led e-commerce product strategy and integration with Shopify and Amazon, driving $2.6M in revenue growth. I implemented attribution modeling across 5 marketing channels, reducing CAC from $75 to $63. I also built data infrastructure including ETL pipelines, a recommendation engine, and real-time analytics dashboards that significantly improved decision-making. Additionally, I developed an A/B testing framework that improved conversion rates by 10%."
  },
  {
    keywords: ["una brands", "data analyst", "experience"],
    question: "What was your role at UNA Brands?",
    answer: "As Senior Data Analyst at UNA Brands, I directed a team of 5 to build a Unified Data Ecosystem using Celigo and PostgreSQL, reducing onboarding time for acquired brands by over 90%. I defined KPIs and OKRs, facilitated Scrum sprints, wrote PRDs, and implemented Jira for better project management, which improved delivery time by 30%. My work on UAT and data-driven enhancements led to a 24% improvement in product performance."
  },
  
  // Skills questions
  {
    keywords: ["skills", "technical", "expertise"],
    question: "What are your technical skills?",
    answer: "My technical skills include data analytics (SQL, Python, R), visualization tools (Tableau, Power BI), cloud platforms (AWS, GCP), ERP systems (NetSuite), integration platforms (Celigo), and project management (Jira, Agile/Scrum). I also have experience with machine learning, NLP, and web development."
  },
  
  // General questions
  {
    keywords: ["contact", "email", "get in touch"],
    question: "How can I contact you?",
    answer: "You can reach me at akansha.akg19@gmail.com. I'm open to discussing new opportunities, collaborations, or answering any questions about my work."
  },
  {
    keywords: ["background", "education", "about"],
    question: "What's your background?",
    answer: "I have over 8 years of experience in product management, data analytics, and software engineering. I've worked across industries including e-commerce, wellness, and technology consulting, with a focus on delivering data-driven solutions that drive business growth."
  },
  
  // Education-related questions
  {
    keywords: ["education", "study", "degree", "university", "college", "babson"],
    question: "Where does Akansha study?",
    answer: "Akansha is currently pursuing her MS in Business Analytics at Babson College. Babson is a private business school in Wellesley, Massachusetts, known for its focus on entrepreneurship education and business analytics."
  },
  {
    keywords: ["ms", "masters", "graduate", "program", "business analytics"],
    question: "What is Akansha studying?",
    answer: "Akansha is currently pursuing a Master of Science (MS) in Business Analytics at Babson College. This program focuses on the intersection of data analysis, business strategy, and decision-making. Her studies include advanced analytics, data visualization, machine learning, and business intelligence."
  },
  {
    keywords: ["when", "year", "graduate", "graduation"],
    question: "When did Akansha start studying at Babson?",
    answer: "Akansha began her MS in Business Analytics program at Babson College in 2023 and is expected to graduate in 2025. This educational pursuit complements her extensive professional experience in product management and data analytics."
  },
  {
    keywords: ["course", "classes", "subjects", "learning"],
    question: "What courses is Akansha taking?",
    answer: "As part of her MS in Business Analytics at Babson, Akansha's coursework includes data visualization, machine learning algorithms, business intelligence, statistical modeling, and analytics strategy. These technical skills complement her product management background."
  },
];

// Generate conversation starter examples from projects and experience
export const generateConversationStarters = (): string[] => {
  return [
    "What projects has Akansha worked on?",
    "Tell me about Akansha's experience at Santo Remedio",
    "Where does Akansha study?",
    "What is Akansha's educational background?",
    "What skills does Akansha have?",
    "How can I contact Akansha?",
    "Tell me about the E-commerce Marketplace Integration project",
    "What was Akansha's role at UNA Brands?",
    "What tools is Akansha proficient in?",
    "Tell me about the Real-time Analytics Dashboard project",
    "What was Akansha's biggest achievement?",
    "How many years of experience does Akansha have?",
  ];
};

// Find the best matching QA pair for a user query
export const findRelevantAnswer = (query: string): string | null => {
  // First check if the experience agent can handle this query
  const agentResult = experienceAgent.processQuery(query);
  if (agentResult.isRelevant && agentResult.answer) {
    return agentResult.answer;
  }

  const query_lower = query.toLowerCase();
  
  // First, check for exact question matches
  const exactMatch = qaDatabase.find(
    qa => qa.question.toLowerCase() === query_lower
  );
  
  if (exactMatch) {
    return exactMatch.answer;
  }
  
  // If no exact match, look for keyword matches
  let bestMatch: QAPair | null = null;
  let highestScore = 0;
  
  qaDatabase.forEach(qa => {
    let score = 0;
    qa.keywords.forEach(keyword => {
      if (query_lower.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = qa;
    }
  });
  
  // Handle education queries specifically
  if (
    (query_lower.includes("study") || 
     query_lower.includes("college") || 
     query_lower.includes("education") ||
     query_lower.includes("university") ||
     query_lower.includes("school") ||
     query_lower.includes("degree") ||
     query_lower.includes("babson")) &&
    (query_lower.includes("where") || 
     query_lower.includes("what") ||
     query_lower.includes("when") ||
     query_lower.includes("how"))
  ) {
    return "Akansha is currently pursuing her MS in Business Analytics at Babson College. She started in 2023 and is expected to graduate in 2025. Prior to this, she completed her undergraduate degree in Engineering, which provided a strong foundation for her career in product management and data analytics.";
  }
  
  // Handle general queries about contact information
  if (
    query_lower.includes("contact") ||
    query_lower.includes("email") ||
    query_lower.includes("get in touch") ||
    query_lower.includes("reach out")
  ) {
    return "You can contact Akansha at akansha.akg19@gmail.com. Would you like to send her an email now?";
  }
  
  // Handle greeting queries
  if (
    query_lower.match(/^(hi|hello|hey|greetings|howdy)[\s!.?]*$/i) ||
    query_lower.includes("good morning") ||
    query_lower.includes("good afternoon") ||
    query_lower.includes("good evening")
  ) {
    return "Hello! 👋 I'm Akansha's virtual assistant. How can I help you today? Feel free to ask about her experience, projects, or skills.";
  }
  
  return bestMatch ? bestMatch.answer : null;
};
