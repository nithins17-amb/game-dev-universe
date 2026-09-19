# Game Development Workshop Website

## Direction
Build a dark, cinematic single-scroll experience inspired by an AAA game trailer, refined with Apple-like restraint and an original game-engine interface language. The official poster supplies the event facts and speaker photographs, but its colorful brochure layout will not be reused.

The opening composition will pair oversized `GAME / DEVELOPMENT` typography with an original, generated, rear-view fictional game character overlooking a layered world of ruins, floating terrain, clouds, and distant structures. Motion stays subtle: depth parallax, drifting particles, slow light movement, masked text reveals, and restrained cursor feedback.

## Public experience
- Add a short first-visit `MEC GAME DEV` initialization screen with a skippable start action and returning-visitor memory.
- Build transparent-to-solid navigation, active section tracking, smooth anchor movement, a compact six-level HUD, vertical progress rail, and a full-screen mobile menu.
- Build the hero with the official institution and department, workshop title, tagline, supplied description, date, time, venue, fee, registration button, and layered original artwork.
- Add Levels 01–06 with the exact supplied curriculum:
  - Idea and production pipeline
  - Game design and an interactive player loop
  - Original engine-style Unity workspace
  - C# editor with a visual compile interaction
  - Animation state timeline
  - Two-session 3D game build pipeline and completion state
- Add expandable UI/UX, mobile/web, and publishing topics.
- Add the two resource persons using clean poster crops when visually suitable; otherwise use premium initials without invented biographies.
- Add event details, an IST countdown, and the final `READY PLAYER?` registration moment linking to the official Google Form in a new tab.
- Add a restrained footer with the official college website and supplied address.

## Interaction and accessibility
- Desktop: custom cursor that preserves browser behavior, magnetic primary actions, subtle pointer parallax, reveal transitions, particles, and cinematic depth.
- Mobile/tablet: simplified HUD, reduced particles and parallax, readable character layering, full-width calls to action, and no custom cursor.
- Honor reduced-motion preferences, keyboard navigation, semantic landmarks, visible focus states, strong contrast, and non-animation equivalents.
- No autoplay audio; reserve a future hero asset folder for optional video/layer replacements.

## Secure registration architecture
- Enable Lovable Cloud for authentication and private participant storage.
- Create a `participants` table with registration ID, participant contact/course fields, status, and timestamps; include no sample participant records.
- Create a separate `user_roles` table and server-validated admin role checks.
- Apply row-level security so participant records are unavailable publicly and manageable only by authenticated admins.
- Add a protected `/admin` sign-in and dashboard with counts, search, filters, sorting, participant detail, status updates, and CSV export.
- Keep public registration on the official Google Form. Native registration and QR check-in remain future-ready architecture only and will not be presented as working features.

## Visual system and assets
- Define all palette, type, surfaces, gradients, focus, motion, and atmospheric effects as shared semantic design tokens.
- Generate one original cinematic hero artwork without a recognizable or copyrighted character.
- Extract only the two speaker photographs from the poster if crop quality is adequate.
- Use lightweight CSS/SVG/React motion rather than WebGL or large video assets.

## Verification
- Verify metadata, official facts, links, image loading, countdown, intro persistence, navigation, active levels, visual compile/build interactions, reduced-motion behavior, and console output.
- Test at 390px, 430px, 768px, and desktop widths for overflow, hierarchy, readability, and CTA visibility.
- Verify `/admin` redirects unauthenticated visitors and participant data is protected.
