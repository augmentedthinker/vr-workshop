# VR Workshop

VR Workshop is the build repo for the OpenClaw Workshop Palace: a browser-based WebXR space for Meta Quest 2 where Christopher can enter the Workshop as a navigable memory palace.

The first goal is deliberately small:

- one central hall
- one camera rig
- one interaction system
- one room/content manifest
- one clearly nonhuman OpenClaw presence
- one GitHub Pages deployment

The project should prove comfort, readability, presence, and iteration speed before adding more rooms, live voice, or backend infrastructure.

## Direction

The current recommendation from our research is:

- Use A-Frame on top of WebXR for the first build.
- Keep the frontend static and GitHub Pages friendly.
- Use simple geometry, GLB/glTF assets, generated textures, and strong composition before heavy 3D scenes.
- Use controller ray interaction first, with gaze as fallback and hand tracking later.
- Use teleport or portal-based movement before smooth locomotion.
- Represent OpenClaw as a nonhuman light/orb/energy presence before attempting any humanoid avatar.
- Do not expose API keys in browser code.
- Add realtime AI voice only after the static spatial prototype works, likely through a small secure backend/proxy that issues ephemeral credentials.

## Prototype Ladder

1. **Prototype 0: Static Central Hall**
   - A single Quest-openable A-Frame scene.
   - One artifact pedestal.
   - One note panel.
   - One silent OpenClaw light-form.
   - Desktop and Quest Browser verification.

2. **Prototype 1: Navigation**
   - Room portals for Home, Artifacts, Projects, Reflections, and Notes.
   - Comfortable teleport or portal transition.
   - Clear return path.

3. **Prototype 2: Workshop Content**
   - Manifest-backed artifact/project/note cards.
   - Lazy-loaded room content.
   - Crisp readable text.

4. **Prototype 3: OpenClaw Presence**
   - Orb/light-form state machine.
   - Idle, noticing, listening, thinking, and responding states.
   - Spatial audio test with scripted or pre-recorded voice.

5. **Prototype 4: Voice**
   - Secure backend/proxy.
   - Realtime or chained STT/TTS voice.
   - No browser-side master API keys.

6. **Prototype 5: Persistence**
   - Local state first.
   - Later shared memory/session state if the experience earns it.

## Repo Structure

Planned structure once implementation starts:

```
index.html
src/
  core/
  components/
  rooms/
  content/
assets/
  models/
  textures/
  audio/
  fonts/
docs/
  context/
  research/
```

## Research Context

Research and planning inputs live under `docs/`:

- [VR Workshop Palace Concept](docs/context/vr-workshop-palace-concept.md)
- [Google VR Research](docs/research/google-vr-research.md)
- [ChatGPT VR Research](docs/research/chatgpt-vr-research.md)

The OpenClaw Workshop remains the archive and planning surface. This repo is for the actual WebXR build.

## Boundary

Start small. Do not build a platform before the room works.

The first success condition is simple: Christopher opens the page in the Quest 2 browser, enters the central hall, sees a readable and emotionally coherent Workshop space, and feels that the idea deserves the next room.
