// Replicated from client/FWClient/src/rhynn/Playfield.java

export class Playfield {
    constructor(name, numCellsX, numCellsY) {
        this.s_VisibilityCellRange = 5;
        this.s_VisibilityCellRangeWSize = (this.s_VisibilityCellRange * 2) + 1;
        this.bytesPerCell = 2;

        this.characters = new Map();
        this.items = new Map();
        this.tilesetsLoaded = new Map();

        this.data = Array.from({ length: numCellsX }, () => Array(numCellsY).fill(null));
        this.name = name;
        this.writeIndex = 0;
        this.numCellsX = numCellsX;
        this.numCellsY = numCellsY;
        this.width = 0;
        this.height = 0;

        this.observer = null;
    }

    setObserver(obs) {
        this.observer = obs;
    }

    // Add methods as needed, e.g., loadData, getCell, etc.
}