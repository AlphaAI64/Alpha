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

// Added ChatMessage interface to fix the import error in ChatWidget.tsx
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}