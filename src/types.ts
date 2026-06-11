export type Emotion =
  | "Calm"
  | "Focused"
  | "Happy"
  | "Stressed"
  | "Anxious"
  | "Sad"
  | "Angry"
  | "Tired";

export type BandValues = {
  delta: number;
  theta: number;
  alpha: number;
  beta: number;
  gamma: number;
};

export type LiveReading = {
  time: string;
  emotion: Emotion;
  confidence: number;
  signalQuality: number;
  bands: BandValues;
};

export type Session = {
  id: string;
  date: string;
  time: string;
  duration: string;
  dominantEmotion: Emotion;
  confidence: number;
  signal: number;
  track: string;
};
