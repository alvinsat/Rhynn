// Replicated from client/FWClient/src/rhynn/Item.java

import { WorldObject } from './WorldObject.js';

export class Item extends WorldObject {
    static USAGE_TYPE_UNKNOWN = 0;
    static USAGE_TYPE_EQUIP = 1;
    static USAGE_TYPE_USE = 2;
    static USAGE_TYPE_GOLD = 3;

    static CLIENT_TYPE_UNKNOWN = 0;
    static CLIENT_TYPE_WEAPON_1 = 1;
    // Add more as needed

    static ATTR_TYPE_UNKNOWN = 0;
    static ATTR_TYPE_HEALTH = 1;
    // Add more

    static DEFAULT_WIDTH = 15;
    static DEFAULT_HEIGHT = 15;
    static SLOT_WIDTH = 16;

    constructor() {
        super();
        // Add properties
    }
}