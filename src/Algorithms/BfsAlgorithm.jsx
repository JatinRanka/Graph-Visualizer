import React from 'react';

export default function BfsAlgorithm(nodes, startNode, finishNode, TOTAL_ROWS, TOTAL_COLS){
    const tempNodes = nodes;
    const visitedNodes = [];
    const queue = [];
    queue.push(startNode);
    let parents = [];
    let row = startNode.row;
    let col = startNode.col;
    parents[startNode.key] = startNode.key;
    let isPathFound = false;

    console.log(finishNode.isWall);

    while(queue.length !== 0){
        let currentNode = queue.shift();

        if(currentNode===finishNode){
            isPathFound = true;
            break;
        }

        let neighbourNodes = getNeighbourNodes(nodes, currentNode, TOTAL_ROWS, TOTAL_COLS);

        for(let i=0; i<neighbourNodes.length; i++){
            let row = neighbourNodes[i].row;
            let col = neighbourNodes[i].col;


            if(!nodes[row][col].isVisited && !nodes[row][col].isWall){
                queue.push(nodes[row][col]);

                parents[nodes[row][col].key] = currentNode.key;

                nodes[row][col].isVisited = true;  
                nodes[row][col].parentNode = currentNode;
                visitedNodes.push(nodes[row][col]);
            }
        }
    }
    let pathNodes = [];
    if(isPathFound){
        pathNodes = getPathNodes(finishNode, startNode);
    }
    return [visitedNodes, pathNodes];
}

function getPathNodes(finishNode, startNode){
    let pathNodes = [];
    while(!(startNode.row === finishNode.row) || !(startNode.col === finishNode.col)){
        // if(!finishNode.isFinish && !finishNode.isStart){
        pathNodes.unshift(finishNode);
        // }

        finishNode = finishNode.parentNode;
    }
    return pathNodes;
}

function getNeighbourNodes(nodes, currentNode, TOTAL_ROWS, TOTAL_COLS){
    let row = currentNode.row;
    let col = currentNode.col;
    let neighbourNodes = [];
    //right
    if(col<TOTAL_COLS-1){
        neighbourNodes.push(nodes[row][col+1]);
    }
    //bottom
    if(row<TOTAL_ROWS-1){
        neighbourNodes.push(nodes[row+1][col]);
    }
    //left
    if(col>0){
        neighbourNodes.push(nodes[row][col-1]);
    }   
    //up
    if(row>0) {
        neighbourNodes.push(nodes[row-1][col]);
    }
    return neighbourNodes;
}
