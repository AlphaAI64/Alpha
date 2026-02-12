export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  impact: string;
  description: string;
  image: string;
}

/**
 * Fix: Added ChatMessage interface to resolve the import error in ChatWidget.tsx
 */
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}