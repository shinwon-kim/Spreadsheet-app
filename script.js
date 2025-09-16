const spreadSheetContainter = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = [];
for(let i = 65; i <= 90; i++){
    alphabets.push(String.fromCharCode(i));
}

class Cell {
    constructor(isHeader, disabled, data, row, column, active=false) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.active = active;
    }
}

initSpreadsheet();
function initSpreadsheet() {
    for(let i = 0; i < ROWS; i++){
        let spreadsheetRow = [];

        
        for(let j = 0; j < COLS; j++){
            let cellData = "";
            let isHeader = false;

            // Numbering first Column
            if(j === 0){
                cellData = i;
                isHeader = true;
            }

            if(i === 0){
                cellData = alphabets[j - 1];
                isHeader = true;
            }

            // first Row Column is blank
            if(!cellData){
                cellData = "";
            }

            const cell = new Cell(isHeader, false, cellData, i, j, false)
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
    drawSheet();
    // console.log(spreadsheet);
}

function createCellEl(cell) {
    const cellEl = document.createElement("input");
    cellEl.className = "cell";
    cellEl.id = "cell_" + cell.row + cell.column;
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;
    return cellEl;
}

function drawSheet() {
    for(let i = 0; i < spreadsheet.length; i++){
        const rowContainerEl = document.createElement("div");
        rowContainerEl.className = "cell-row";
        for(let j = 0; j < spreadsheet[i].length; j++){
            const cell = spreadsheet[i][j];
            rowContainerEl.append(createCellEl(cell));
        }  
        spreadSheetContainter.append(rowContainerEl);
    }
}