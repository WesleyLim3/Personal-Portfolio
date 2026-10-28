# Arena and court refinement

Tool: built-in imagegen. Existing arena edited with the user-supplied court diagram as the geometry reference.

Source: `src/assets/portfolio/maryland-home-court-cleaned.png`

Updated asset: `src/assets/portfolio/maryland-home-court-refined.png`

## Final prompt

Use case: precise-object-edit. Image 1 is the EDIT TARGET: the existing wide retro Maryland arena hero image. Image 2 is a REFERENCE ONLY: a basketball court marking/dimension diagram supplied by the user. Edit image 1; do not output the diagram.

Arena cleanup:
1. At the TOP TIER of bleachers, remove the malformed dark entry/tunnel openings that blend into the seats and stairways. Replace these openings with continuous, evenly spaced concrete STAIR STEPS that extend each existing aisle all the way up through that top seating tier. Maintain clean straight separations between stair aisles and the black seat blocks; no doors/tunnels at the tops of those aisles.
2. In the MIDDLE HORIZONTAL CONCOURSE LEVEL of warm yellow-lit entrances / open box bays, remove ALL the blurry, ghostlike, half-formed black chair silhouettes sitting inside those bays. Make the bays clean empty architectural entrance spaces with consistent floor, walls, and railings. Keep their warm lighting, structural columns, and real entrance doors. Do NOT remove the clearly defined black bleacher seating, gold courtside seats, or black foreground seat backs.
3. Keep the two previously cleared courtside stair entrances open. Keep both repaired black/yellow shot clocks legibly reading '24', and the central HOME 00 / GUEST 00 scoreboard.

Court correction, using IMAGE 2 AS THE AUTHORITATIVE GEOMETRY REFERENCE:
Remove the inaccurate existing floor linework and redraw the complete court as a single coherent, symmetric, properly proportioned marking layout projected onto the existing floor plane. The playing rectangle is 94 ft long (left to right in this view) by 50 ft wide (far to near sideline). Use one consistent perspective / vanishing geometry for every floor marking. White perimeter boundary, center line perpendicular to sidelines, 6-ft-radius center circle at exact midpoint. Both rectangular painted lanes must be 16 ft wide and 19 ft deep from baseline to free throw line. Rims centered on the lanes, 5 ft 3 in inside each baseline; backboards 4 ft inside baselines. Free throw circles 6 ft radius, with the half-circle inside each painted lane dashed and the half outside solid. Restricted area semicircles 4 ft radius centered below each rim. Three-point arcs 23 ft 9 in radius from the basket centers, smoothly joining the straight corner-three segments which are 3 ft inside each sideline (22 ft from the basket across the width). Add tidy lane-space hash marks and short sideline ticks matching the reference. Both halves must mirror exactly in court coordinates. Circles become correct perspective ellipses on this floor. No extra cross-court horizontal lines, no doubled/overlapping court layouts, no stray white fragments, no wobbly arcs. Make all paint strokes crisp with consistent width. Preserve golden hardwood, black painted lane interiors, black/gold court border, and the red Maryland M and Maryland flag emblem at center court; integrate the correct visible white center circle and centerline cleanly with the emblem. The floor should read as the exact court in reference 2 with Maryland branding, seen from the same arena camera as image 1, not as a flat diagram pasted into the image. Do not print measurement numbers, arrows, dimensions, or diagram annotations on the floor.

General: clean up obvious smudged or impossible small architectural details and broken floor reflections, but keep the camera viewpoint, wide aspect ratio, framing, Maryland flag ribbon displays, arena lighting, basket positions, polished wood reflections, and the recognizable retro 3D/pixel video game rendering style. No people, portraits, UI, website text, new decorations, or watermark. Output just the complete improved arena image.
