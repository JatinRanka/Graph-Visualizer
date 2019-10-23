import React from 'react';
import CreateBorderWall from './CreateBorderWall.jsx';


export default function RandomMaze(parameters){
    let nodes = parameters.nodes;
    const TOTAL_ROWS = parameters.TOTAL_ROWS;
    const TOTAL_COLS = parameters.TOTAL_COLS;
    let wallsPlanted = 0;
    let random = 0

    nodes = CreateBorderWall(nodes, TOTAL_ROWS, TOTAL_COLS);

    // To generate new startNode
    let START_NODE_ROW = Math.floor((Math.random())*TOTAL_ROWS);
    let START_NODE_COL = Math.floor((Math.random())*TOTAL_COLS);

    while(nodes[START_NODE_ROW][START_NODE_COL].isWall){
        START_NODE_ROW = Math.floor((Math.random())*TOTAL_ROWS);
        START_NODE_COL = Math.floor((Math.random())*TOTAL_COLS);
    }

    nodes[START_NODE_ROW][START_NODE_COL].isStart = true;

    // To generate new finish node
    let FINISH_NODE_ROW = Math.floor((Math.random())*TOTAL_ROWS);
    let FINISH_NODE_COL = Math.floor((Math.random())*TOTAL_COLS);

    // Change finishNode if it is startNode or wallNode
    while(nodes[FINISH_NODE_ROW][FINISH_NODE_COL].isStart || nodes[FINISH_NODE_ROW][FINISH_NODE_COL].isWall){
        FINISH_NODE_ROW = Math.floor((Math.random())*TOTAL_ROWS);
        FINISH_NODE_COL = Math.floor((Math.random())*TOTAL_COLS);
    }

    nodes[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = true;

    // Create walls at 300 nodes
    while(wallsPlanted < 300){
        // Generate random row value for wall
        random = Math.random();
        let row = Math.floor(random*TOTAL_ROWS);

        // Generate random col value for wall
        random = Math.random();
        let col = Math.floor(random*TOTAL_COLS);

        // If the wall node is already occupied, then skip
        if(nodes[row][col].isStart || nodes[row][col].isFinish || nodes[row][col].isWall){
            continue;
        }

        nodes[row][col].isWall = true;
        wallsPlanted ++;
    }

    // New node values generated by this function
    const randomMazeValues = {
        nodes,
        START_NODE_ROW,
        START_NODE_COL,
        FINISH_NODE_ROW,
        FINISH_NODE_COL
    };

    return randomMazeValues;
}