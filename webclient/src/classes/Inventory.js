// Replicated from client/FWClient/src/rhynn/Inventory.java

import { Equipment } from './Equipment.js';

export class Inventory {
    static DEFAULT_NUM_SLOTS = 22;
    static DEFAULT_SLOTS_PER_ROW = 11;

    constructor(character, numSlots = Inventory.DEFAULT_NUM_SLOTS, slotsPerRow = Inventory.DEFAULT_SLOTS_PER_ROW) {
        this.numSlots = numSlots;
        this.numSlotsPerRow = slotsPerRow;
        this.numItems = 0;
        this.selectedSlot = 0;
        this.items = new Array(numSlots).fill(null);
        this.equipment = new Equipment(this);
        this.character = character;
    }

    // Add methods like addItem, removeItem, etc.
    addItem(item) {
        for (let i = 0; i < this.numSlots; i++) {
            if (this.items[i] === null) {
                this.items[i] = item;
                this.numItems++;
                return true;
            }
        }
        return false; // No space
    }

    removeItem(index) {
        if (this.items[index]) {
            this.items[index] = null;
            this.numItems--;
            return true;
        }
        return false;
    }
}