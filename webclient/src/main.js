import * as Phaser from '../node_modules/phaser/dist/phaser.esm.js';
import { Playfield } from './classes/Playfield.js';
import { Character } from './classes/Character.js';
import { Item } from './classes/Item.js';
import { Network } from './classes/Network.js';

const ASSET_ROOT = 'assets/src/';

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.image('ingame', ASSET_ROOT + 'ingame.png');
        this.load.image('intro', ASSET_ROOT + 'intro.png');
        this.load.image('menu', ASSET_ROOT + 'menu.png');
        this.load.image('quest', ASSET_ROOT + 'quest.png');
        this.load.image('special', ASSET_ROOT + 'special.png');
        this.load.image('chatfont', ASSET_ROOT + 'chatfont.png');
        this.load.image('phone_template', ASSET_ROOT + 'phone_template.png');
        this.load.image('icon', ASSET_ROOT + 'icon.png');
        this.load.spritesheet('player', ASSET_ROOT + 'players01.png', { frameWidth: 20, frameHeight: 24 });
        this.load.spritesheet('items01', ASSET_ROOT + 'items01.png', { frameWidth: 15, frameHeight: 15 });
        this.load.spritesheet('items02', ASSET_ROOT + 'items02.png', { frameWidth: 15, frameHeight: 15 });
        this.load.audio('sound0', ASSET_ROOT + 'sound0.mid');
    }

    create() {
        this.add.image(400, 300, 'intro').setAlpha(0.25);
        this.add.text(120, 260, 'Rhynn Web Client', { fontSize: '32px', fill: '#ffffff' });

        this.network = new Network();
        this.network.connect();
        this.scene.start('GameScene', { network: this.network });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.network = data.network;
    }

    preload() {
        // Additional game assets can be preloaded here
    }

    create() {
        this.add.rectangle(0, 0, 800, 600, 0x003300).setOrigin(0);
        this.add.image(0, 0, 'ingame').setOrigin(0).setAlpha(0.1);

        this.playfield = new Playfield('TestField', 25, 19);
        this.player = new Character();
        this.player.curHealth = 100;
        this.player.x = 400;
        this.player.y = 300;

        this.playerSprite = this.physics.add.sprite(this.player.x, this.player.y, 'player', 0);
        this.playerSprite.setCollideWorldBounds(true);
        this.playerSprite.setScale(1.2);

        this.items = [];
        this.itemSprites = [];
        for (let i = 0; i < 8; i++) {
            const item = new Item();
            item.x = 100 + Math.random() * 600;
            item.y = 100 + Math.random() * 400;
            item.frame = Phaser.Math.Between(0, 31);
            item.sheet = i % 2 === 0 ? 'items01' : 'items02';
            this.items.push(item);

            const sprite = this.add.sprite(item.x, item.y, item.sheet, item.frame).setScale(2);
            this.itemSprites.push(sprite);
        }

        this.npcs = [];
        this.npcSprites = [];
        for (let i = 0; i < 3; i++) {
            const npc = new Character();
            npc.x = 120 + Math.random() * 560;
            npc.y = 120 + Math.random() * 360;
            npc.curHealth = 100;
            npc.frame = Phaser.Math.Between(0, 24);
            this.npcs.push(npc);

            const sprite = this.add.sprite(npc.x, npc.y, 'player', npc.frame).setScale(1.2);
            this.npcSprites.push(sprite);
        }

        this.questItems = 0;
        this.questText = this.add.text(10, 50, `Quest: Collect 5 items (${this.questItems}/5)`, { fontSize: '16px', fill: '#fff' });
        this.healthText = this.add.text(10, 10, `Health: ${this.player.curHealth}`, { fontSize: '16px', fill: '#fff' });
        this.inventoryText = this.add.text(10, 30, `Inventory: ${this.player.inventory.numItems} items`, { fontSize: '16px', fill: '#fff' });
        this.add.image(768, 16, 'icon').setScale(1.2).setOrigin(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        if (this.sound.get('sound0')) {
            try {
                this.sound.add('sound0');
            } catch (e) {
                console.warn('Unable to attach MIDI sound asset:', e);
            }
        }
    }

    renderTilemap() {
        for (let x = 0; x < 25; x++) {
            for (let y = 0; y < 19; y++) {
                const color = (x + y) % 2 === 0 ? 0x007700 : 0x005500;
                this.add.rectangle(x * 32, y * 32, 32, 32, color).setOrigin(0);
            }
        }
    }

    update() {
        let moved = false;
        const speed = 160;

        this.playerSprite.body.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.playerSprite.body.setVelocityX(-speed);
            moved = true;
        } else if (this.cursors.right.isDown) {
            this.playerSprite.body.setVelocityX(speed);
            moved = true;
        }

        if (this.cursors.up.isDown) {
            this.playerSprite.body.setVelocityY(-speed);
            moved = true;
        } else if (this.cursors.down.isDown) {
            this.playerSprite.body.setVelocityY(speed);
            moved = true;
        }

        this.player.x = this.playerSprite.x;
        this.player.y = this.playerSprite.y;

        if (moved) {
            this.network.move(this.player.x, this.player.y);
        }

        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            const sprite = this.itemSprites[i];
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y) < 24) {
                if (this.player.inventory.addItem(item)) {
                    sprite.destroy();
                    this.items.splice(i, 1);
                    this.itemSprites.splice(i, 1);
                    this.questItems++;
                }
            }
        }

        this.npcs.forEach((npc, idx) => {
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y) < 40) {
                this.player.curHealth -= 0.15;
            }
            const sprite = this.npcSprites[idx];
            sprite.x = npc.x;
            sprite.y = npc.y;
        });

        this.player.curHealth = Phaser.Math.Clamp(this.player.curHealth, 0, 100);

        this.healthText.setText(`Health: ${Math.floor(this.player.curHealth)}`);
        this.inventoryText.setText(`Inventory: ${this.player.inventory.numItems} items`);
        this.questText.setText(`Quest: Collect 5 items (${this.questItems}/5)`);
        if (this.questItems >= 5) {
            this.questText.setText('Quest Complete!');
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, GameScene]
};

const game = new Phaser.Game(config);