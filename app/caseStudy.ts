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
