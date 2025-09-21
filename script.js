const spreadSheetContainter = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector("#export-btn");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = [];
for(let i = 65; i <= 90; i++){
    alphabets.push(String.fromCharCode(i));
}

class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active=false) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
}

exportBtn.onclick = function (e) {
    let csv = "";
    for (let i = 0; i < spreadsheet.length; i++){
        csv += spreadsheet[i]
                .filter(item => !item.isHeader)
                .map(item => item.data)
                .join(",") + "\r\n";
    }
    console.log("Export Spreadsheet", csv);
}

initSpreadsheet();
function initSpreadsheet() {
    for(let i = 0; i < ROWS; i++){
        let spreadsheetRow = [];
        
        for(let j = 0; j < COLS; j++){
            let cellData = "";
            let isHeader = false;
            let disabled = false;

            // Numbering first Column
            if(j === 0){
                cellData = i;
                isHeader = true;
                disabled = true;
            }

            if(i === 0){
                cellData = alphabets[j - 1];
                isHeader = true;
                disabled = true;
            }

            // first Row Column is blank
            if(!cellData){
                cellData = "";
            }

            const rowName = i;
            const columnName = alphabets[j - 1];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false)
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

    if(cell.isHeader){
        cellEl.classList.add("header");
    }

    cellEl.onclick = () => handleCellClick(cell);
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell);
    return cellEl;
}

function handleOnChange(data, cell) {
    cell.data = data;
}

function handleCellClick(cell) {
    clearHeaderActiveStates();
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    columnHeaderEl.classList.add("active");
    rowHeaderEl.classList.add("active");
}

function clearHeaderActiveStates() {
    const headers = document.querySelectorAll(".header");

    headers.forEach((header) => {
        header.classList.remove("active");
    })
}

function getElFromRowCol(row, col){
    return document.querySelector("#cell_" + row + col);
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