import React from 'react';

export default function CreateBorderWall(nodes, TOTAL_ROWS, TOTAL_COLS){
    
    // Set first & last row - wall
    for(let col=0; col<TOTAL_COLS; col++){
        // first row
        nodes[0][col].isWall = true;
        // last row
        nodes[TOTAL_ROWS-1][col].isWall = true;
    }

    // Set first and last col - wall
    for(let row=0; row<TOTAL_ROWS; row++){
        // first col
        nodes[row][0].isWall = true;
        // last col
        nodes[row][TOTAL_COLS-1].isWall = true;
    }

    return nodes;
}