const spreadSheetContainter = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];

initSpreadsheet();

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
function initSpreadsheet() {
    for(let i = 0; i < ROWS; i++){
        let spreadsheetRow = [];
        for(let j = 0; j < COLS; j++){
            spreadsheetRow.push(i + "-" + j);
        }
        spreadsheet.push(spreadsheetRow);
    }
}
