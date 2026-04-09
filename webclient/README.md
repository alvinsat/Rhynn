# Rhynn Web Client

A web-based client for the Rhynn game using Phaser.js framework.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser.

## Features

- Basic Phaser game setup with scenes
- Replicated core classes: Playfield, Character, Item, Inventory, Equipment, WorldObject
- Network layer with HTTP polling for server integration
- Player movement with arrow keys and collision detection
- Item pickup and inventory management
- Simple tilemap rendering
- UI elements: health and inventory display
- NPC rendering and basic combat
- Quest system (collect items)
- Asset integration using actual FWClient asset files

## Assets Loaded from `assets/src/`

- `ingame.png`
- `intro.png`
- `menu.png`
- `quest.png`
- `special.png`
- `chatfont.png`
- `phone_template.png`
- `icon.png`
- `players01.png`
- `items01.png`
- `items02.png`
- `sound0.mid`

## Notes

- `players01.png` is used as the player sprite sheet.
- `items01.png` and `items02.png` are used for item sprites.
- `sound0.mid` is loaded as the audio asset; browser support may vary for MIDI playback.
- The code now loads the actual asset filenames supplied in `webclient/assets/src/`.

## TODO

- **Audio**: Implement MIDI playback support or convert `sound0.mid` to a browser-friendly format.
- **Full tilemap rendering**: Replace the temporary grid with actual tile graphics.
- **Server integration**: Ensure the backend provides the game API and move data as expected.
- **UI polish**: Replicate the original client menus and inventory UI using Phaser or HTML overlays.
- **Complete asset usage**: Map more graphics IDs from the original client to the webclient sprites.


## Replicated from Client

- **Playfield**: Manages game world cells, characters, items
- **Character**: Player/NPC with health, mana, inventory
- **Item**: Game items with types and attributes
- **Inventory**: Player inventory with slots
- **Equipment**: Equipped items
- **WorldObject**: Base class for game objects
## TODO

- **Asset Loading**: Load actual game assets (tiles, sprites, sounds) from `client/FWClient` or `server/FWWorldGraphics` into `webclient/assets/`. (Sound file copied if available; images not found in repo)
- **Audio**: Load and play sounds from `client/FWClient/src/sound0.mid` and other assets. (MIDI not supported by Phaser; requires additional library)
- **Testing**: Test against running server, ensure behavior matches original client. (Requires server with HTTP API)

## Integration with Server

The client attempts to connect to the server via WebSocket. Update the server URL in `Network.js` and implement message handling for login, movement, and updates.