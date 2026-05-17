# VR Workshop Palace Concept

This document carries the working concept from the OpenClaw Workshop artifact into the dedicated VR build repo.

## Core Idea

Create a WebXR memory-palace version of the OpenClaw Workshop that Christopher can enter with a Meta Quest 2.

The public Workshop already has conceptual rooms:

- Home
- Artifacts
- Projects
- Reflections
- Notes

The VR Workshop turns those rooms into spatial places. Instead of reading the archive as a flat website, Christopher can enter a central hall, see where the collaboration lives, and move through rooms that represent artifacts, active projects, reflective lessons, and continuity notes.

## OpenClaw Presence

The first OpenClaw embodiment should be restrained and nonhuman:

- light-form
- orb
- energy construct
- glass/signal companion
- subtle emissive presence

Avoid a humanoid avatar for the MVP. Human embodiment adds animation, lip-sync, uncanny-valley risk, and false expectations. A nonhuman presence can still feel attentive, useful, and alive inside the space.

## First Prototype

The first prototype should not be a palace yet. It should be one room:

- central hall
- one portal
- one artifact pedestal
- one note panel
- one silent OpenClaw orb placeholder

If that room is comfortable, readable, lightweight, and emotionally distinctive in the Quest 2 browser, then the palace can grow.

## Prior Augmented Thinker VR Lineage

Relevant older experiments:

- `saber-ar-presence-2026-02-22`: strongest ancestor; A-Frame 1.6, Quest/WebXR setup, controller floor targeting, companion/presence model, speech recognition/synthesis, mode switching, memory cue cards.
- `vr-2026-02-22`: Quest-ready immersive A-Frame space garden with start overlay, audio unlock, stars/rings, and central luminous object.
- `shootingballs`: Quest VR forest shooter with controller raycasting, projectiles, haptics, audio, scoring, and restart loop.
- `animaeus`: compact A-Frame cube room with image wall, gaze/click interactions, interactive orb, lighting, and theme changes.
- `sphere`: A-Frame room with music unlock, spherical/Escher texture language, and click ambience.
- `ARcube`: Three.js WebXR AR demo with ARButton and simple cube placement.
- `VR-1-6`: more ambitious procedural scene with browser-side API sketch; conceptually useful, but do not copy browser-side API-key patterns.
- `VRportfolio`: useful distribution pattern with demo links, QR flow, and VR/AR project catalog.

## Current Technical Direction

Use A-Frame first.

Use Three.js later if we need deeper control.

Watch Meta Immersive Web SDK as a possible future path.

Keep Babylon.js as a strong alternative if controller/teleportation tooling becomes the dominant problem.

Do not start with Unity, Godot, Wonderland, or PlayCanvas unless the workflow changes toward engine/editor-based production.

## Build Doctrine

One room first.

No browser-side secrets.

No live AI voice until the static spatial loop proves itself.

Comfort and readability are not polish. They are core functionality.

The headset decides what matters next.
