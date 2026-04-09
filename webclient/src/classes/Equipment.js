// Replicated from client/FWClient/src/rhynn/Equipment.java

import { Item } from './Item.js';

export class Equipment {
    static ET_WEAPON_1 = 0;
    static ET_SHIELD_1 = 1;
    static ET_ARMOR = 2;
    static ET_HELMET = 3;
    static ET_BOOTS = 4;
    static ET_GLOVES = 5;
    static NUM_EQUIPMENT_SLOTS = 6;

    static DEFAULT_NUM_BELT_SLOTS = 4;

    constructor(parentInventory, numBeltSlots = Equipment.DEFAULT_NUM_BELT_SLOTS) {
        this.parentInventory = parentInventory;
        this.numBeltSlots = numBeltSlots;
        this.items = new Array(Equipment.NUM_EQUIPMENT_SLOTS).fill(null);
        this.beltItems = new Array(numBeltSlots).fill(null);
        this.selectedBeltSlot = 0;
    }

    ghostCopy() {
        const copy = new Equipment(null, this.numBeltSlots);
        for (let i = 0; i < this.numBeltSlots; i++) {
            copy.beltItems[i] = this.beltItems[i];
        }
        return copy;
    }
}