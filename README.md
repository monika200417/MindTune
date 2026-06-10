# MindTune Dashboard

Phase 1 clickable UI prototype for the MindTune EEG emotion-detection and adaptive music
therapy project.

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Production check

```bash
npm run build
```

## Prototype features

- Responsive dashboard navigation
- Simulated live EEG readings and emotion classification
- Start and stop session controls
- Emotion timeline and brainwave charts
- Session history and detail views
- Seven-day wellness analytics
- Per-emotion music preferences and track previews
- Device health and pairing flow
- Profile, notification, and privacy settings
- Setup, signal-quality, and safety help

All data is currently simulated in `src/data.ts`. The live simulator in `src/App.tsx` models the
five-second telemetry contract planned for the ESP32 integration phase.

MindTune is presented as a research wellness prototype, not a medical device.
