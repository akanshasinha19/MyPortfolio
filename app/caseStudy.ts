export const caseStudyContent = {
    "ecommerce-integration": `# Recommendation Engine for Product Boost  
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
`




    
  };
