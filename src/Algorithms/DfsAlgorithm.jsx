import React from 'react';


export default function DfsAlgorithm(nodes, startNode, finishNode, TOTAL_ROWS, TOTAL_COLS){
    const dest = finishNode;
    let isPathFound = false;
    let parentNode = startNode;
    let pathNodes = [];
    let visitedNodesAndIsPathFound = DfsUtil(nodes, startNode, finishNode, [], TOTAL_ROWS, TOTAL_COLS, isPathFound, pathNodes);
    const visitedNodes = visitedNodesAndIsPathFound[0];
    isPathFound = visitedNodesAndIsPathFound[1];

    if(isPathFound){
        pathNodes =visitedNodesAndIsPathFound[2];
    }
    return [visitedNodes, pathNodes];
}


function DfsUtil(nodes, startNode, finishNode, visitedNodes, TOTAL_ROWS, TOTAL_COLS, isPathFound, pathNodes){

    if (startNode.row===finishNode.row && startNode.col===finishNode.col){
        return [visitedNodes, true, pathNodes];
    }

    //top
    if(startNode.row>0 && !isPathFound){
        let currentNode = nodes[startNode.row-1][startNode.col];
        if(!currentNode.isWall && !currentNode.isVisited){
            pathNodes.push(currentNode);
            currentNode.isVisited = true;
            visitedNodes.push(currentNode);
            let visitedNodesAndIsPathFound = DfsUtil(nodes, currentNode, finishNode, visitedNodes, TOTAL_ROWS, TOTAL_COLS, isPathFound, pathNodes);
            visitedNodes = visitedNodesAndIsPathFound[0];
            isPathFound = visitedNodesAndIsPathFound[1];
            (isPathFound) ? pathNodes = visitedNodesAndIsPathFound[2] : pathNodes.pop();
        }
    }

    //right
    if(startNode.col<TOTAL_COLS-1 && !isPathFound){
        let currentNode = nodes[startNode.row][startNode.col+1];
        if(!currentNode.isWall && !currentNode.isVisited){
            pathNodes.push(currentNode);
            currentNode.isVisited = true;
            visitedNodes.push(currentNode);
            let visitedNodesAndIsPathFound = DfsUtil(nodes, currentNode, finishNode, visitedNodes, TOTAL_ROWS, TOTAL_COLS, isPathFound, pathNodes);
            visitedNodes = visitedNodesAndIsPathFound[0];
            isPathFound = visitedNodesAndIsPathFound[1];
            (isPathFound) ? pathNodes = visitedNodesAndIsPathFound[2] : pathNodes.pop();
        }
    }

    //bottom
    if(startNode.row<TOTAL_ROWS-1 && !isPathFound){
        let currentNode = nodes[startNode.row+1][startNode.col];
        if(!currentNode.isWall && !currentNode.isVisited){
            pathNodes.push(currentNode);
            currentNode.isVisited = true;
            visitedNodes.push(currentNode);
            let visitedNodesAndIsPathFound = DfsUtil(nodes, currentNode, finishNode, visitedNodes, TOTAL_ROWS, TOTAL_COLS, isPathFound, pathNodes);
            visitedNodes = visitedNodesAndIsPathFound[0];
            isPathFound = visitedNodesAndIsPathFound[1];
            (isPathFound) ? pathNodes = visitedNodesAndIsPathFound[2] : pathNodes.pop();
        }
    }

    //left
    if(startNode.col>0 && !isPathFound){
        let currentNode = nodes[startNode.row][startNode.col-1];
        if(!currentNode.isWall && !currentNode.isVisited){
            pathNodes.push(currentNode);
            currentNode.isVisited = true;
            visitedNodes.push(currentNode);
            let visitedNodesAndIsPathFound = DfsUtil(nodes, currentNode, finishNode, visitedNodes, TOTAL_ROWS, TOTAL_COLS, isPathFound, pathNodes);
            visitedNodes = visitedNodesAndIsPathFound[0];
            isPathFound = visitedNodesAndIsPathFound[1];
            (isPathFound) ? pathNodes = visitedNodesAndIsPathFound[2] : pathNodes.pop();
        }
    }

    return [visitedNodes, isPathFound, pathNodes];

}