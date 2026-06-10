import type { Emotion, LiveReading, Session } from "./types";

export const emotionMeta: Record<
  Emotion,
  { color: string; soft: string; message: string; track: string }
> = {
  Calm: {
    color: "#1f8f7a",
    soft: "#dff4ee",
    message: "Your alpha activity suggests a relaxed, settled state.",
    track: "Open Sky"
  },
  Happy: {
    color: "#d99b28",
    soft: "#fff2cf",
    message: "Balanced alpha and theta activity suggests positive energy.",
    track: "Golden Hour"
  },
  Sad: {
    color: "#5378a8",
    soft: "#e4ecf7",
    message: "Theta activity is elevated. MindTune selected a gentle lift.",
    track: "Morning Light"
  },
  Anxiety: {
    color: "#7968a8",
    soft: "#eee9f8",
    message: "Mixed high-frequency activity suggests elevated arousal.",
    track: "Quiet Current"
  },
  Anger: {
    color: "#c76552",
    soft: "#f9e5df",
    message: "Beta activity is elevated. A lower-arousal track is playing.",
    track: "Slow Tides"
  }
};

export const initialReadings: LiveReading[] = [
  { time: "09:18", emotion: "Calm", confidence: 76, signalQuality: 91, bands: { delta: 16, theta: 25, alpha: 46, beta: 22, gamma: 10 } },
  { time: "09:19", emotion: "Calm", confidence: 79, signalQuality: 93, bands: { delta: 15, theta: 24, alpha: 49, beta: 20, gamma: 9 } },
  { time: "09:20", emotion: "Happy", confidence: 73, signalQuality: 89, bands: { delta: 14, theta: 35, alpha: 42, beta: 24, gamma: 11 } },
  { time: "09:21", emotion: "Happy", confidence: 78, signalQuality: 92, bands: { delta: 13, theta: 38, alpha: 44, beta: 23, gamma: 10 } },
  { time: "09:22", emotion: "Calm", confidence: 81, signalQuality: 94, bands: { delta: 16, theta: 29, alpha: 51, beta: 19, gamma: 8 } },
  { time: "09:23", emotion: "Calm", confidence: 84, signalQuality: 94, bands: { delta: 17, theta: 28, alpha: 56, beta: 18, gamma: 7 } }
];

export const sessions: Session[] = [
  { id: "MT-2406", date: "Jun 10, 2026", time: "9:18 AM", duration: "24 min", dominantEmotion: "Calm", confidence: 84, signal: 94, track: "Open Sky" },
  { id: "MT-2306", date: "Jun 9, 2026", time: "8:42 PM", duration: "18 min", dominantEmotion: "Anxiety", confidence: 76, signal: 88, track: "Quiet Current" },
  { id: "MT-2206", date: "Jun 8, 2026", time: "7:30 AM", duration: "31 min", dominantEmotion: "Happy", confidence: 81, signal: 92, track: "Golden Hour" },
  { id: "MT-2106", date: "Jun 7, 2026", time: "6:14 PM", duration: "14 min", dominantEmotion: "Sad", confidence: 72, signal: 85, track: "Morning Light" },
  { id: "MT-2006", date: "Jun 6, 2026", time: "9:02 AM", duration: "27 min", dominantEmotion: "Calm", confidence: 87, signal: 95, track: "Open Sky" }
];

export const weeklyTrend = [
  { day: "Thu", calm: 36, happy: 22, elevated: 42 },
  { day: "Fri", calm: 42, happy: 25, elevated: 33 },
  { day: "Sat", calm: 48, happy: 28, elevated: 24 },
  { day: "Sun", calm: 40, happy: 34, elevated: 26 },
  { day: "Mon", calm: 51, happy: 24, elevated: 25 },
  { day: "Tue", calm: 55, happy: 27, elevated: 18 },
  { day: "Wed", calm: 61, happy: 25, elevated: 14 }
];

export const distribution = [
  { name: "Calm", value: 44, fill: "#1f8f7a" },
  { name: "Happy", value: 24, fill: "#d99b28" },
  { name: "Anxiety", value: 15, fill: "#7968a8" },
  { name: "Sad", value: 10, fill: "#5378a8" },
  { name: "Anger", value: 7, fill: "#c76552" }
];

export const musicOptions: Record<Emotion, string[]> = {
  Calm: ["Open Sky", "Forest Window", "Still Water"],
  Happy: ["Golden Hour", "Sunlit Walk", "Soft Bloom"],
  Sad: ["Morning Light", "Small Steps", "New Day"],
  Anxiety: ["Quiet Current", "Deep Exhale", "Gentle Rain"],
  Anger: ["Slow Tides", "Low Horizon", "Cool Air"]
};
