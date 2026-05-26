export type Collection = {
  id: string;
  title: string;
  pieces: number;
  image: string;
  description: string;
};

export type Artist = {
  name: string;
  role: string;
  specialty: string;
  image: string;
  pieces: number;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Insight = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  tag: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};
