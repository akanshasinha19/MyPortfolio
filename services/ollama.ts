/**
 * Service for interacting with the Ollama API
 */

import { promptData } from "@/app/caseStudy";
import { experienceAgent } from "@/utils/experienceAgent";

interface OllamaRequestOptions {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  stream: boolean;
  system?: string;
}

interface OllamaCompletionResponse {
  model: string;
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

class OllamaService {
  private readonly endpoint: string = 'https://ollama.penify.life/ollama/api/chat';
  private readonly defaultModel: string = 'gemma3';
  private isApiAvailable: boolean = true;
  
  /**
   * Generate a completion without streaming
   */
  async generateCompletion(prompt: string, model: string = this.defaultModel): Promise<string> {
    // First check if this is an experience-related query that our agent can handle
    const agentResult = experienceAgent.processQuery(prompt);
    if (agentResult.isRelevant && agentResult.answer) {
      return agentResult.answer;
    }
    
    // If we already know the API is down, don't attempt to call it
    if (!this.isApiAvailable) {
      return this.getFallbackResponse(prompt);
    }

    if (prompt.length < 4000) {
        prompt += `\n\nBelow is the portfolio of Akansha ${promptData}`
    }
    
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "user",
              content: prompt
            },{
              role: "system",
              content: "You are Akansha's AI assistant. Be helpful, concise, and friendly. Provide information about Akansha's experience, projects, and skills based on her portfolio. Format your responses using markdown for better readability - use headings, bullet points, bold, and links where appropriate. If the user asks for a specific project, provide details about that project. If the user asks for a skill, provide details about that skill. If the user asks for contact information, provide Akansha's email address. If the user asks for education, provide details about Akansha's education. If the user asks for experience, provide details about Akansha's work experience. If the user asks for a portfolio, provide details about Akansha's portfolio. If the user asks for a resume, provide details about Akansha's resume. If the user asks for a CV, provide details about Akansha's CV. If the user asks for a cover letter, provide details about Akansha's cover letter. If the user asks for a LinkedIn profile, provide details about Akansha's LinkedIn profile. If the user asks for a GitHub profile, provide details about Akansha's GitHub profile. If the user asks for a personal website, provide details about Akansha's personal website. If the user asks for a blog, provide details about Akansha's blog. If they ask irrelevant questions, provide a generic response.",
            }
          ],
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.message.content;
    } catch (error) {
      console.error('Error generating completion:', error);
      this.isApiAvailable = false;
      
      // Return a fallback response when the API is unavailable
      return this.getFallbackResponse(prompt);
    }
  }

  /**
   * Generate a streaming completion
   * @returns A ReadableStream of completion chunks
   */
  generateCompletionStream(prompt: string, model: string = this.defaultModel): ReadableStream<Uint8Array> {
    // First check if this query can be answered by our experience agent
    const agentResult = experienceAgent.processQuery(prompt);
    
    // Use the stored endpoint reference for consistency
    const endpoint = this.endpoint;
    if (prompt.length < 100) {
        prompt += `\n\nBelow is the portfolio of Akansha ${promptData}`
    }
    const requestOptions: OllamaRequestOptions = {
      model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      stream: true,
      system: "You are Akansha's AI assistant. Be helpful, concise, and friendly. Provide information about Akansha's experience, projects, and skills based on her portfolio. Format your responses using markdown for better readability - use headings, bullet points, bold, and links where appropriate.",
    };

    // Reference to track API availability
    const self = this;

    const stream = new ReadableStream({
      async start(controller) {
        // If agent can handle this query, return its response immediately
        if (agentResult.isRelevant && agentResult.answer) {
          // We'll simulate streaming with the agent response for a smooth UX
          const answerText = agentResult.answer;
          const chunkSize = 10; // characters per chunk
          
          // Add a small delay to simulate processing
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Stream the agent's answer in small chunks to simulate natural typing
          for (let i = 0; i < answerText.length; i += chunkSize) {
            const chunk = answerText.substring(i, i + chunkSize);
            controller.enqueue(new TextEncoder().encode(chunk));
            // Small random delay between chunks for natural typing feel
            await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 30));
          }
          
          controller.close();
          return;
        }
        
        // If we already know the API is down, immediately return a fallback response
        if (!self.isApiAvailable) {
          const fallbackResponse = self.getFallbackResponse(prompt);
          controller.enqueue(new TextEncoder().encode(fallbackResponse));
          controller.close();
          return;
        }
        
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestOptions),
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          if (!response.body) {
            throw new Error('Response body is null');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = ''; // Buffer for accumulating partial JSON chunks

          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              // Process any remaining data in the buffer
              if (buffer.trim()) {
                try {
                  const data = JSON.parse(buffer) as OllamaCompletionResponse;
                  controller.enqueue(new TextEncoder().encode(data.message?.content || ''));
                } catch (e) {
                  console.warn('Failed to parse final JSON chunk:', buffer);
                }
              }
              controller.close();
              break;
            }
            
            // Append new chunk to existing buffer
            buffer += decoder.decode(value, { stream: true });
            
            // Process complete JSON objects
            let jsonStartIndex = 0;
            let jsonEndIndex: number;

            // Find each complete JSON object in the buffer
            while ((jsonEndIndex = buffer.indexOf('\n', jsonStartIndex)) !== -1) {
              const jsonLine = buffer.substring(jsonStartIndex, jsonEndIndex).trim();
              jsonStartIndex = jsonEndIndex + 1;
              
              if (jsonLine) {
                try {
                  const data = JSON.parse(jsonLine) as OllamaCompletionResponse;
                  if (data.message && typeof data.message.content === 'string') {
                    controller.enqueue(new TextEncoder().encode(data.message.content));
                  }
                } catch (e) {
                  console.warn('Failed to parse JSON:', jsonLine, e);
                }
              }
            }
            
            // Keep the remaining partial JSON object in the buffer
            if (jsonStartIndex < buffer.length) {
              buffer = buffer.substring(jsonStartIndex);
            } else {
              buffer = '';
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
          
          // Mark the API as unavailable for future requests
          self.isApiAvailable = false;
          
          // Provide a fallback response when the API fails
          const fallbackResponse = self.getFallbackResponse(prompt);
          controller.enqueue(new TextEncoder().encode(fallbackResponse));
          controller.close();
        }
      }
    });

    return stream;
  }
  
  /**
   * Provides a fallback response when the API is unavailable
   */
  private getFallbackResponse(prompt: string): string {
    // First check if our agent can handle this
    const agentResult = experienceAgent.processQuery(prompt);
    if (agentResult.isRelevant && agentResult.answer) {
      return agentResult.answer;
    }
    
    // Analyze the prompt to generate a relevant fallback response
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes("education") || 
        promptLower.includes("study") || 
        promptLower.includes("college") || 
        promptLower.includes("degree") ||
        promptLower.includes("university") ||
        promptLower.includes("babson")) {
      return "## Education\n\nAkansha is currently pursuing her **MS in Business Analytics** at Babson College, which she started in 2023. She's focusing on:\n\n- Advanced analytics\n- Data visualization\n- Machine learning\n- Statistical modeling\n\nBefore this, she completed her undergraduate degree in Engineering.";
    }
    
    if (promptLower.includes("experience") || promptLower.includes("work")) {
      return "## Professional Experience\n\nAkansha has over **8 years of experience** in product management and data analytics. Her career includes:\n\n- **Product Manager** at Santo Remedio\n- **Senior Data Analyst** at UNA Brands\n- Experience with various technologies including Tableau, BigQuery, and NetSuite";
    }
    
    if (promptLower.includes("project") || promptLower.includes("portfolio")) {
      return "## Notable Projects\n\nAkansha has worked on several impactful projects:\n\n- **E-commerce Marketplace Integration** that generated $2.6M in revenue\n- **Recommendation Engine** that increased Average Order Value\n- **Real-time Analytics Dashboard** that reduced decision-making time from 10 hours to 30 minutes";
    }
    
    if (promptLower.includes("contact") || promptLower.includes("email")) {
      return "## Contact Information\n\nYou can reach Akansha at **akansha.akg19@gmail.com** to discuss opportunities or ask questions about her work.";
    }
    
    if (promptLower.includes("skill") || promptLower.includes("tech")) {
      return "## Technical Skills\n\nAkansha's expertise includes:\n\n- **Data Analytics**: SQL, Python, R\n- **Visualization Tools**: Tableau, Power BI\n- **Cloud Platforms**: AWS, GCP\n- **ERP Systems**: NetSuite\n- **Integration Platforms**: Celigo\n- **Project Management**: Agile/Scrum methodologies";
    }
    
    // Default fallback response with markdown
    return "## About Akansha\n\nI'm currently having trouble connecting to my knowledge base. Akansha is a **Product Manager** with experience in:\n\n- Data analytics\n- E-commerce integrations\n- Building recommendation systems\n\nShe's currently pursuing her MS in Business Analytics at Babson College. For more specific information, you can ask about her education, projects, experience, or skills.";
  }
  
  /**
   * Check if the API is available
   * Can be used to periodically retry connecting to the API
   */
  async checkApiAvailability(): Promise<boolean> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'HEAD',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      this.isApiAvailable = response.ok;
      return this.isApiAvailable;
    } catch (error) {
      this.isApiAvailable = false;
      return false;
    }
  }
}

export const ollamaService = new OllamaService();
export default ollamaService;
