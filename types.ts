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

// Fix: Added ChatMessage interface to support the messaging system and resolve import error in ChatWidget.tsx
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}