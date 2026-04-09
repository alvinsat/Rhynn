// Replicated from client/FWClient/src/rhynn/Character.java

import { WorldObject } from './WorldObject.js';
import { Inventory } from './Inventory.js';

export class Character extends WorldObject {
    static MAX_HITSHOWDURATION = 1800;
    static MAX_HITSHOWDURATION_LOCAL = 1500;
    static MAX_ATTACKSHOWDURATION = 450;
    static MAX_DEADSHOWDURATION = 10000;

    static MOVE_ANIMATION_INTERVAL = 100;
    static ITEM_PICKUP_RADIUS = 32;

    constructor() {
        super();
        this.inventory = new Inventory();
        this.publicChatMessage = '';
        this.highPrioMessage = '';
        this.publicChatMessageTimeout = 0;
        this.highPrioMessageTimeout = 0;
        this.clanId = 0;
        this.customMessage = '';
        this.curHealth = 0;
        this.curMana = 0;
        this.healthEffectsExtra = 0;
        this.manaEffectsExtra = 0;
        this.attackEffectsExtra = 0;
        this.defenseEffectsExtra = 0;
        // Add more properties as needed
    }

    // Add methods like update, render, etc.
}