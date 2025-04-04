export const caseStudyContent = {
    "ecommerce-integration": `# E-commerce Marketplace Integration  
**Santo Remedio | Product Manager**  
**Aug 2022 – Aug 2024**

## Situation  
Santo Remedio had established itself as a leading wellness brand in Latin America, selling exclusively through its own website. While the DTC model had driven early success, by 2022, revenue growth was stalling, customer acquisition costs were rising, and market reach had plateaued. There was a clear need to expand into new channels like Amazon and Shopify to increase accessibility and reach new customer segments. However, the company had no existing infrastructure for multichannel commerce, and internal systems were not integrated to support such an expansion.

The operations team was dependent on NetSuite for order management, but this ERP was disconnected from any external marketplaces. Fulfillment processes, inventory tracking, and marketing analytics were tightly coupled to a single-channel setup. Scaling to external platforms meant transforming not only how products were sold but also how they were processed, tracked, and analyzed.

## Task  
As Product Manager, I was brought on to lead the company’s first major external platform integration initiative. My objective was to launch Santo Remedio’s Amazon and Shopify stores, implement real-time integrations with our ERP, and ensure seamless order-to-cash processing. The initiative had to maintain operational continuity, provide visibility into multichannel performance, and drive meaningful business growth.

My responsibilities included owning the product roadmap, aligning stakeholders across engineering, operations, and marketing, and delivering a robust system that would allow us to scale across channels without adding operational complexity.

## Action  
I began with internal discovery interviews across marketing, fulfillment, and finance to map existing workflows and identify potential friction points. I facilitated a service design session to map the current order lifecycle and identify where the single-channel logic would break in a multichannel world. This helped align stakeholders on the scale of transformation ahead and set realistic expectations.

From there, I created a backlog of user stories for key flows: order sync, inventory updates, fulfillment triggers, and financial reconciliation. Examples included:  
"As a fulfillment associate, I want Amazon and Shopify orders to land in NetSuite instantly, so I can manage them using the same workflow as website orders," and  
"As a finance manager, I need marketplace revenue data reconciled with our native store so that I can track revenue performance without switching systems."

I selected Celigo as the middleware for its robust integration support with NetSuite and marketplace APIs. Working with four engineers, I led sprint planning, backlog grooming, and stakeholder demos to ensure cross-functional transparency. We built bidirectional flows for product catalogs, inventory levels, fulfillment statuses, and returns.

During UAT, I worked closely with operations and customer support teams to simulate edge cases—split shipments, returns, order cancellations, inventory cutoffs—and fine-tuned the system for reliability. I also collaborated with marketing and analytics to define KPIs for each channel and built Tableau dashboards that would track revenue, conversion, and fulfillment accuracy across Shopify and Amazon.

## Result  
The project delivered measurable impact. Within two years, the new channels generated $2.6 million in additional revenue. Customer growth increased by 40%, and internal operations scaled seamlessly across platforms with zero additional headcount. Our order accuracy remained above 98%, and marketing was able to track attribution and performance by channel for the first time. Most importantly, the entire company shifted from a single-channel mindset to a multi-platform business, backed by strong systems and data visibility.

## Reflection  
This project taught me the importance of aligning technical infrastructure with business strategy. It wasn’t just about launching a new store—it was about productizing a new operational model. By starting with user discovery and mapping internal friction, I ensured we built a system that was not only scalable, but adopted and loved by those who used it daily. It became a template for future integrations and marked Santo Remedio’s transition into a data-informed, platform-ready brand.
`,
 "recommendation-engine": `# Recommendation Engine for Product Boost  
**Santo Remedio | Product Manager**  
**Aug 2022 – Aug 2024**

## Situation  
Santo Remedio had a growing digital presence and a loyal base of wellness-focused customers. But analysis of customer behavior revealed that while users frequently browsed multiple products, the majority of transactions included only a single item. The product catalog was well-suited for bundling — for example, customers purchasing sleep supplements often viewed teas or relaxation kits. Yet there was no system in place to surface these relationships. Discovery was passive. The website lacked personalized recommendations, and there were no built-in nudges to explore or bundle items.

This disconnect was leading to flat Average Order Values (AOV) and missed cross-sell opportunities. Our marketing team was doing the heavy lifting through one-time offers, but these lacked relevance and didn’t scale well across different buyer journeys.

## Task  
My objective as Product Manager was to design and deploy a recommendation engine that could boost AOV and enhance the customer experience. The goal was to surface personalized, high-relevance product suggestions across the user journey — from PDP to cart to post-purchase — using a system that was efficient to build, maintainable by the team, and capable of driving measurable results.

The system needed to be simple enough to launch quickly but flexible enough to grow into more advanced personalization in the future. We couldn’t rely on third-party black-box solutions, and we didn’t yet have the infrastructure for machine learning at scale.

## Action  
I began with discovery. I conducted funnel analysis using site analytics and interviewed the support team to identify user frustrations. I mapped the customer journey from first product page view to checkout, identifying friction points and drop-off patterns. This analysis confirmed what we saw in the data: product discovery was limited, especially in the cart and checkout stages.

From there, I scoped a rule-based MVP using Association Rule Mining. I collaborated with our data team to mine co-purchase patterns and surface relationships between SKUs. For instance, if customers who bought a certain herbal tea also frequently purchased a supplement, we treated that as a high-confidence association. I wrote functional requirements for a lightweight engine that could process over 500,000 user interactions daily and generate recommendations based on live cart and browsing data.

On the frontend, I worked with design and engineering to implement the recommendations in three key placements: below the product description, inside the cart summary, and on the post-checkout confirmation page. I A/B tested the placement logic and messaging variants to balance visibility with conversion performance. I also tracked bounce rate, cart abandonment, and clickthrough rate as secondary metrics to ensure we weren’t adding friction.

I documented edge cases like product out-of-stock scenarios, over-promotion of similar SKUs, and frequency caps, and ensured the engine was rules-configurable by the marketing team without ongoing engineering support.

## Result  
The recommendation engine increased Average Order Value from $63 to $64.29. While the per-order lift may seem modest, it drove substantial incremental revenue across thousands of monthly transactions. More importantly, it validated that personalized product suggestions could improve customer engagement without adding cognitive load or disrupting the buying flow.

The project also provided the foundation for more sophisticated recommendation strategies. The engine became a reliable source of user interaction data that we later used to inform marketing segmentation, email triggers, and homepage layout tests.

## Reflection  
This was one of my favorite examples of iterative product thinking. Rather than chasing complexity, I shipped an MVP that delivered value fast, aligned with our tech capabilities, and created a path toward future personalization. The engine wasn’t just a feature — it was a stepping stone toward making Santo Remedio’s digital experience smarter, more contextual, and more responsive to user intent.
`,

 "real-time-dashboard":`# Real-time Analytics Dashboard  
**Santo Remedio | Product Manager**  
**Aug 2022 – Aug 2024**

## Situation  
As Santo Remedio expanded, the lack of centralized, real-time business intelligence became a major blocker. Teams across marketing, operations, finance, and leadership were making decisions based on static spreadsheets, ad hoc exports, and week-old dashboards. Attribution models were fragmented. CAC reports conflicted with NetSuite revenue numbers. Fulfillment delays weren’t flagged until customer complaints rolled in. Leadership spent hours every week trying to align on data that should have been accessible within seconds.

This lack of unified visibility was no longer sustainable. It was slowing down campaign pivots, delaying operational interventions, and forcing teams to work off assumptions rather than evidence.

## Task  
I was assigned to lead the design and implementation of a real-time analytics dashboard that would become the single source of truth for Santo Remedio. It needed to integrate data from various tools — including NetSuite, Shopify, Celigo, Facebook Ads, and Google Analytics — and deliver live insights to marketing analysts, fulfillment leads, and executive stakeholders.

The dashboard had to serve multiple use cases while remaining intuitive, performant, and flexible. My core goal was to reduce time-to-insight and help teams operate based on shared, trusted data.

## Action  
I began by conducting stakeholder interviews across every department to understand what decisions were being delayed or derailed by slow data. I mapped those pain points into user stories for three main personas: the marketing analyst optimizing campaign spend, the ops lead managing fulfillment bottlenecks, and the executive who needed revenue and retention summaries at a glance.

I collaborated with our engineering team to architect ETL pipelines that would ingest 5GB+ of data per day from our core systems and load it into BigQuery. I oversaw data modeling and ensured that key tables were refreshed every 15 minutes, balancing granularity with performance.

I led the UX design for the dashboards using Tableau. For each persona, I tailored the interface to match their mental model — marketers got filters by campaign, cohort, and CAC; ops leads saw order aging reports and fulfillment heatmaps; executives had high-level summaries with click-to-drill functionality. I also introduced alerts and anomaly detection features for key thresholds like spend spikes or inventory shortages.

Beyond the build, I drove adoption through internal workshops and 1:1 enablement. I worked with department heads to embed the dashboards into weekly meetings and daily check-ins. I also created a system for tracking dashboard usage to refine content and anticipate future needs.

## Result  
The dashboard reduced decision-making time from 5–10 hours to under 30 minutes. It became a core part of our operating rhythm. Marketing was able to adjust paid spend mid-flight. Fulfillment resolved delays proactively. Executives relied on the tool for real-time performance tracking and strategic planning. The data infrastructure also enabled faster experimentation cycles and improved our A/B testing rigor.

Perhaps most importantly, it helped shift the company’s culture toward evidence-based thinking. Teams stopped waiting for analysts to deliver answers — they learned how to ask and answer better questions themselves.

## Reflection  
This was more than a reporting tool. It was a product that empowered every other team to be more effective. I treated data not just as a resource, but as an experience — one that needed discovery, iteration, and design. The result was not just faster answers, but better decisions.
`
  };

export const projects = [
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
  
export const experience = [
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

export const promptData = `
Resume link : https://www.akansha.info/Resume.pdf

AKANSHA SINHA
Babson College | +8575404843 | akansha.akg19@gmail.com | http://www.linkedin.com/in/akanshasinha19
EDUCATION
BABSON COLLEGE, F.W. OLIN GRADUATE SCHOOL OF BUSINESS, Wellesley, MA August 2024 - May 2025
MS in Business Analytics Candidate
• Artificial Intelligence, Deep Learning, Data Analytics, Advanced Python, Reinforcement Learning
UTTAR PRADESH TECHNICAL UNIVERSITY, India June 2012 - June 2016
B. Tech, Information Technology
7.34/10.
EXPERIENCE
Santo Remedio, Bangalore August 2022 - August 2024
Product Manager - 2 Years
• Led cross-functional team of twelve to develop and execute e-commerce product strategy for Shopify and Amazon
marketplace integration, resulting in $2.6M revenue increase and 35% growth in customer base over 2 years.
• Implemented attribution modeling across 5 marketing channels, diminishing CAC(Customer Acquisition Cost) from $75 to
$63 while increasing (Customer's Lifetime Value)LTV/CAC ratio from 1.7 to 1.9.
• Initiated data decision making by leading team to build ETL pipelines processing 5GB daily data and architecting real-time
analytics dashboard using BigQuery and Tableau, reducing decision-making time from 10 hours to 30 mins.
• Spearheaded a team of engineers to develop recommendation engine using Association Rules, processing 500K daily user
interactions, boosting AOV(Average Order Value) from $63 to $64.29.
• Built A/B Test framework executing 9 tests, generating 4 features and lifted conversion by 10% (from 2.2% to 2.42%).
UNA Brands, Bangalore September 2021 - July 2022
Senior Data Analyst - 1 Year
• Led a team of five to architect Unified Data Ecosystem using Celigo and PostgreSQL. Streamlined multi-brand data
integration, reducing onboarding time by more than 90% for acquired e-commerce businesses.
• Defined business metrics, KPIs, and OKRs, facilitated weekly sprints within a Scrum framework, and developed product
requirement documents to align teams and drive strategic goals.
• Introduced Jira for backlog management and roadmap visibility, resulting in 30% improvement in project delivery times.
• Collaborated with stakeholders during UAT to validate product features and prioritize enhancements based on user
feedback.
NxtSuite Technologies, Pune April 2020 - September 2021
Project Team Lead - 1.3 Years
• Managed 15 clients, overseeing end-to-end implementation of Order-to-Cash, Procure-to-Pay, and Inventory Management
modules using Celigo and NetSuite ERP.
• Led a team of five engineers to integrate NetSuite with third-party APIs, optimizing operational efficiency by 40% and
driving $200K in revenue growth.
• Initiated the Project Health Check (PHC) report using Power BI to analyze Invoiced milestones, Billing events, and
expenses, helping managers with revenue, billing, and enhancing resource allocation by 15%.
Infosys, Pune November 2016 - March 2020
Senior Software Engineer - 4 Years
• Architected SAP-PI (Process Integration) solutions to support Lonza’s operations across 40+ regions in EMEA and APAC.
• Presented strategic recommendations to leadership, securing $1M in additional funding for implementation and European
market expansion.
ACADEMIC PROJECTS
Machine Learning, Babson September 2024 - December 2024
• Designed a predictive neural network model to identify potential personal loan customers, achieving 97.2% test accuracy
on a dataset of 10,000 records, with insights visualized via neural network diagrams and confusion matrices.
• Developed predictive CART(Classification and Regression Tree) models to estimate GoDaddy’s likeness, achieving a
MAPE(Mean Absolute Percentage Error) of 10.67% and optimized accuracy through advanced tuning, pruning techniques.
• Implemented k-means clustering and hierarchical clustering models for salary and benefits analysis in a public employee
dataset and pictured results through Elbow Charts, scatterplot, and dendrogram.
Data Analytics in Tableau, Babson September 2024 - December 2024
• Analyzed Wayfair's e-commerce data to visualize product profitability trends and enabling actionable insights for inventory
and pricing strategies and improving forecasting by 17%.
• Created a real-time bike usage analytics dashboard for Blue Bike, improving operational optimization by 29%.
SKILLS
Product Management: Product Strategy | Road-mapping | Feature Prioritization | A/B Testing | User Journey Optimization.
Tools and Technologies: Tableau | Power BI | ETL Pipelines | ERP NetSuite | Google Analytics | Big Data | Azure | AWS | Excel.
Language & Database: JavaScript | Python | R | Python(Pandas) | Python(Scikit-learn) | SQL | Postgres | BigQuery | MongoDB.
Project Management: Jira | Confluence | Scrum | Kanban |Trello | Agile | Gap Analysis | Business Document (BRD) | A/B Testing.
Design Tools: Canva, Miro, Figma, PowerPoint
---`;