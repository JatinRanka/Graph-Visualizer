import React from 'react';
import CreateBorderWall from './CreateBorderWall.jsx';

export default function RecursiveDivision(parameters){
    let nodes = parameters.nodes;
    let startRow = parameters.startRow;
    let startCol = parameters.startCol;
    let endRow = parameters.endRow;
    let endCol = parameters.endCol;
    const TOTAL_ROWS = parameters.TOTAL_ROWS;
    const TOTAL_COLS = parameters.TOTAL_COLS;

    const width = endCol-startCol;
    const height = endRow-startCol;
    const orientation = "vertical";
    
    // To create a border wall for the grid (external function)
    let updatedNodes = CreateBorderWall(nodes, TOTAL_ROWS, TOTAL_COLS);

    startRow += 1;
    startCol += 1;
    endRow -= 1;
    endCol -= 1;

    updatedNodes = RecursiveDivisionUtil(updatedNodes, startRow, startCol, endRow, endCol);   
    
    let START_NODE_ROW = Math.floor((Math.random())*TOTAL_ROWS);
    let START_NODE_COL = Math.floor((Math.random())*TOTAL_COLS);
    let FINISH_NODE_ROW = Math.floor((Math.random())*TOTAL_ROWS);
    let FINISH_NODE_COL = Math.floor((Math.random())*TOTAL_COLS);

    // Find random start Node
    while(updatedNodes[START_NODE_ROW][START_NODE_COL].isWall){
        START_NODE_ROW = Math.floor((Math.random())*TOTAL_ROWS);
        START_NODE_COL = Math.floor((Math.random())*TOTAL_COLS);
    }
    // Set random start Node
    updatedNodes[START_NODE_ROW][START_NODE_COL].isStart = true;

    // Find random finish Node
    while(updatedNodes[FINISH_NODE_ROW][FINISH_NODE_COL].isWall || updatedNodes[FINISH_NODE_ROW][FINISH_NODE_COL].isStart){
        FINISH_NODE_ROW = Math.floor((Math.random())*TOTAL_ROWS);
        FINISH_NODE_COL = Math.floor((Math.random())*TOTAL_COLS);
    }
    // Set random finish Node
    updatedNodes[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = true;

    const outputParameters = {
        updatedNodes,
        START_NODE_ROW,
        START_NODE_COL,
        FINISH_NODE_ROW,
        FINISH_NODE_COL        
    };
    
    return outputParameters;
}


function RecursiveDivisionUtil(updatedNodes, startRow, startCol, endRow, endCol){
    let height = endRow-startRow;
    let width = endCol-startCol;

    if(width<5 || height<5) return updatedNodes;

    let orientation = null;

    (width>height) ? orientation="vertical" : orientation="horizontal";

    if(orientation === "vertical"){
        //                Math.floor(Math.random() * ( max -    min       + 1)) +    min;
        let randomCol = (Math.floor(Math.random() * (endCol-2 - startCol+2 )) + startCol+2)-2;

        while(randomCol===1){
            randomCol = (Math.floor(Math.random() * (endCol-2 - startCol+2 )) + startCol+2)-2;
        }
        
        // Wall the whole col 
        for(let row=startRow; row<endRow; row++){
            updatedNodes[row][randomCol].isWall = true;
        }

        // Leave a gap in the col
        const gapNodeRow = Math.floor(Math.random() * ( endRow - startRow - 1)) +   startRow;
        updatedNodes[gapNodeRow][randomCol].isWall = false;

        // Left portion after vertical skew
        updatedNodes = RecursiveDivisionUtil(updatedNodes, startRow, startCol, endRow, randomCol-1);

        // Right portion after vertical skew
        updatedNodes = RecursiveDivisionUtil(updatedNodes, startRow, randomCol+1, endRow, endCol)
    }

    if(orientation === "horizontal"){
        //               Math.floor(Math.random() * (  max -    min   + 1)) +    min;
        let randomRow = (Math.floor(Math.random() * (endRow-2 - startRow+2 )) + startRow+2)-2;

        while(randomRow===1){
            randomRow = (Math.floor(Math.random() * (endRow-2 - startRow+2 )) + startRow+2)-2;
        }

        // Wall the whole row
        for(let col=startCol; col<endCol; col++){
            updatedNodes[randomRow][col].isWall = true;
        }

        // Leave a gap in the row
        const gapNodeCol = Math.floor(Math.random() * ( endCol - startCol - 1)) +   startCol;
        updatedNodes[randomRow][gapNodeCol].isWall = false;

        // Top portion after horizontal skew
        updatedNodes = RecursiveDivisionUtil(updatedNodes, startRow, startCol, randomRow-1, endCol);

        // Bottom portion after horizontal skew
        updatedNodes = RecursiveDivisionUtil(updatedNodes, randomRow+1, startCol, endRow, endCol);
    }

    return updatedNodes;
}