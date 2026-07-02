// lib/workoutx.js
// Clientul WorkoutX — trăiește DOAR pe server.
// Cheia vine din variabila de mediu WORKOUTX_API_KEY (Vercel + .env.local)
// și nu ajunge niciodată în browser sau în aplicația mobilă.
import { WorkoutX } from "@workoutx/sdk";

export const wx = new WorkoutX({
  apiKey: process.env.WORKOUTX_API_KEY,
});