export const caseStudyContent = {
    "ecommerce-integration": `
  # E-commerce Marketplace Integration Case Study
  
  ## Overview
  Led the integration of Shopify and Amazon marketplaces for Santo Remedio, a leading Latin-American wellness brand.
  
  ## Challenge
  The brand needed to expand its digital footprint and create a seamless omnichannel experience across multiple platforms.
  
  ## Solution
  - Implemented a custom Shopify theme with optimized mobile UX
  - Created an inventory synchronization system between platforms
  - Developed a unified order management workflow
  - Integrated customer data for cross-platform retargeting
  
  ## Results
  - **$2.6M revenue growth** within the first year
  - **35% increase** in customer base
  - **28% improvement** in order fulfillment efficiency
  - **Seamless inventory management** across platforms
  
  ![Integration Architecture](/santo_remedio.png)
  
  ## Technical Implementation
  Our approach leveraged API integrations, webhooks, and custom middleware to ensure real-time data flow between systems.
  
  ## Lessons Learned
  The project highlighted the importance of thorough QA testing when dealing with multi-platform integrations and the critical nature of error handling in e-commerce systems.
    `,
    "recommendation-engine": `
  # Product Recommendation Engine Case Study
  
  ## Overview
  Developed a recommendation engine using Association Rules to boost average order value and enhance the customer shopping experience.
  
  ## Challenge
  The company needed to increase cross-selling and upselling opportunities without relying on manual merchandising.
  
  ## Solution
  - Implemented Association Rules algorithm processing 500K+ daily user interactions
  - Created a real-time recommendation API with <100ms response time
  - Built a dashboard for merchandising team to monitor and tweak recommendations
  - Designed A/B testing framework to measure impact
  
  ## Results
  - Increased Average Order Value from **$63 to $64.29**
  - Improved product discovery by **22%**
  - Reduced cart abandonment rate by **8%**
  
  ![Recommendation Flow](/medicine.webp)
  
  ## Technical Implementation
  The recommendation engine was built using Python with Pandas for data processing, scikit-learn for implementing the Association Rules algorithm, and Flask for API deployment.
  
  ## Future Improvements
  Next steps include implementing collaborative filtering and neural network-based recommendations to further personalize the shopping experience.
    `,
    "real-time-dashboard": `
  # Real-time Analytics Dashboard Case Study
  
  ## Overview
  Built ETL pipelines and a BigQuery + Tableau dashboard to process and visualize 5GB of daily data.
  
  ## Challenge
  Decision-making was severely delayed due to manual data processing and lack of real-time insights.
  
  ## Solution
  - Designed automated ETL pipelines using Airflow
  - Implemented a data warehouse in BigQuery
  - Created an interactive Tableau dashboard with key business metrics
  - Set up alert systems for anomaly detection
  
  ## Results
  - Reduced decision-making time from **10 hours to 30 minutes**
  - Improved data accuracy by **97%**
  - Enabled real-time monitoring of critical KPIs
  
  ![Dashboard Screenshot](/data_analytics.jpeg)
  
  ## Technical Implementation
  The solution utilized Google Cloud Platform for data processing, BigQuery for warehousing, and Tableau for visualization, with scheduled pipelines ensuring data freshness.
  
  ## Impact
  The dashboard became the single source of truth for the organization, fundamentally changing how strategic decisions were made across departments.
    `,
    "loan-prediction": `
  # Neural Network for Loan Prediction Case Study
  
  ## Overview
  Designed and implemented a neural network model to predict personal loan approvals with high accuracy.
  
  ## Challenge
  Traditional credit scoring models failed to capture complex patterns in customer financial data, leading to suboptimal loan approvals.
  
  ## Solution
  - Developed a multi-layer neural network using TensorFlow
  - Implemented feature engineering to enhance model inputs
  - Created visualization tools for model explainability
  - Designed a model monitoring system
  
  ## Results
  - Achieved **97.2% test accuracy**
  - Reduced false approvals by **34%**
  - Improved loan portfolio performance by **12%**
  
  ![Neural Network Architecture](/neural_net.avif)
  
  ## Technical Implementation
  The neural network was built using TensorFlow and Keras, with extensive hyperparameter tuning via grid search and k-fold cross-validation to ensure optimal performance.
  
  ## Ethical Considerations
  Extensive testing was conducted to ensure the model didn't introduce bias against protected classes, with regular auditing processes implemented for ongoing fairness evaluation.
    `,
    "salary-clustering": `
  # Clustering Salary & Benefits Data Case Study
  
  ## Overview
  Applied k-means and hierarchical clustering to analyze public employee salary data and identify patterns and anomalies.
  
  ## Challenge
  HR departments needed insights on compensation structures across different regions and job categories to inform policy decisions.
  
  ## Solution
  - Implemented k-means and hierarchical clustering algorithms
  - Developed interactive visualizations including Elbow charts and dendrograms
  - Created a segmentation framework for compensation analysis
  - Built an anomaly detection system
  
  ## Results
  - Identified **5 distinct compensation clusters**
  - Detected **$2.3M in anomalous compensation**
  - Provided data-driven basis for policy reform
  
  ![Clustering Results](/clustering.png)
  
  ## Technical Implementation
  Analysis was performed using Python with scikit-learn for clustering algorithms and Matplotlib/Seaborn for visualization, with emphasis on dimensionality reduction to handle the high-dimensional benefits data.
  
  ## Impact
  The clustering analysis led to a complete restructuring of the compensation framework, resulting in more equitable pay structures and improved employee satisfaction.
    `
  };