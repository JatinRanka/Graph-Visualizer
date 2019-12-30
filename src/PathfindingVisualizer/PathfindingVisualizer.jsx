import React from 'react';
import './PathfindingVisualizer.css';
import Node from './Node.jsx';
import BfsAlgorithm from '../Algorithms/BfsAlgorithm.jsx';
import DfsAlgorithm from '../Algorithms/DfsAlgorithm.jsx';
import RandomMaze from '../mazeAlgorithms/RandomMaze.jsx';
import RecursiveDivision from '../mazeAlgorithms/RecursiveDivision';
import _ from "lodash" // Import the entire lodash library

import { delay } from 'q';

const TOTAL_ROWS = 27;
const TOTAL_COLS = 61;

export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            START_NODE_ROW : 11,
            START_NODE_COL : 20,
            FINISH_NODE_ROW : 11,
            FINISH_NODE_COL : 38,
            nodes : this.getInitialState(),
            isMousePressed : false,
            isStartPressed : false
        };
    }

    getInitialState = () => {
        const initialState = [];
        for (let row=0; row<TOTAL_ROWS; row++){
            initialState.push([]);
            for (let node=0; node<TOTAL_COLS; node++){
                initialState[row].push(this.createNode(row, node));
            }
        }
        return initialState;
    };

    clearWalls(){
        const initialState = this.getInitialState();
        this.setState({nodes : initialState});
        console.log(this.state.nodes[0][0]);    
    }

    clearBoard(){
        document.location.reload();
    }

    componentDidMount(){
        let nodes = [];
        for (let row=0; row<TOTAL_ROWS; row++){
            nodes.push([]);
            for (let col=0; col<TOTAL_COLS; col++){
                nodes[row].push(this.createNode(row, col));
            }
        }
        this.setState({
            nodes : nodes,
            isMousePressed : false
        });
    }

    createNode(row, col){
        const START_NODE_ROW = 11;
        const START_NODE_COL = 20;
        const FINISH_NODE_ROW = 11;
        const FINISH_NODE_COL = 38;
        return({
            key : row*100+col,
            col,
            row,
            // isStart : row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
            // isFinish : row === this.state.FINISH_NODE_ROW && col === this.state.FINISH_NODE_COL,\
            isStart : row===START_NODE_ROW && col===START_NODE_COL,
            isFinish : row===FINISH_NODE_ROW && col===FINISH_NODE_COL,
            isVisited : false,
            isWall : false,
            isPath : false,
            parentNode : null
        });
    }

    onClickNode(row, col){
        console.log("onClick");
        if(this.state.nodes[row][col].isStart){
            return;
        }
        let updatedNodes = this.state.nodes;
        if(updatedNodes[row][col].isStart || updatedNodes[row][col.isFinish]){
            return;
        }
        updatedNodes[row][col].isWall = !updatedNodes[row][col].isWall;
        this.setState({nodes : updatedNodes});
    }

    onMouseDown(row, col){
        let nodes = this.state.nodes;
        if(this.state.START_NODE_ROW===row && this.state.START_NODE_COL===col){
            nodes[row][col].isStart = false;
            this.setState({
                // START_NODE_ROW : row,
                // START_NODE_COL : col,
                nodes : nodes,
                isMousePressed : true,
                isStartPressed : true
            });
            return;
        }

        const updatedNodes = getNewGridWithToggled(nodes, row, col);
        this.setState({
            nodes : updatedNodes,
            isMousePressed : true
        });
    }

    onMouseEnter(row, col){
        // console.log("mouse Enter");
        if(this.state.isStartPressed){
            return;
        }

        if(this.state.isMousePressed){
            const updatedNodes = getNewGridWithToggled(this.state.nodes, row, col);
            this.setState({ nodes : updatedNodes });
        }
    }

    onMouseLeave(row, col){
        // console.log("mouse leave");
        return;
        if(this.state.isStartPressed){
            const updatedNodes = getNewGridStartChange(this.state.nodes, row, col);
            this.setState({
                nodes : updatedNodes,
            });
            return;
        }
    }

    onMouseUp(row, col){
        if(this.state.isStartPressed){
            let nodes = this.state.nodes;
            nodes[row][col].isStart = true;

            this.setState({
                START_NODE_ROW : row,
                START_NODE_COL : col,
                nodes : nodes,
                isMousePressed : false,
                isStartPressed : false
            });
        }
        this.setState({isMousePressed : false});
        // alert("mouse up, startpress : " +  this.state.isStartPressed);
    }

    renderGrid(nodes){
        return nodes.map((row, rowIndex) => {
            return row.map((node, nodeIndex) => {
                const {key, col, row, isStart, isFinish, isVisited, isWall, isPath} = node;
                    return(
                        <div>
                            <Node 
                                key = {key}
                                col = {col}
                                row = {row}
                                isStart = {isStart}
                                isFinish = {isFinish}
                                isVisited = {isVisited}
                                isWall = {isWall}  
                                isPath = {isPath} 
                                onClick = {(e) => this.onClickNode(row, col)}
                                onMouseDown = {(e) => this.onMouseDown(row, col)}
                                onMouseEnter = {() => this.onMouseEnter(row, col)} 
                                onMouseLeave = {() => this.onMouseLeave(row, col)} 
                                onMouseUp = {(e) => this.onMouseUp(row, col)}
                                // onMouseOver = {() => this.onMouseOver(row, col)}                       
                            >
                                
                            </Node>
                            {(TOTAL_COLS-1===col) ? <div className="Clear"/> : ""}
                        </div>
                    );
            });
        });
    }

    visualizeAlgorithm(nodes){

        let updatedNodes = _.cloneDeep(nodes);
        const type = document.getElementById('Select').value;
        if(type === "none"){
            window.alert("Select type of algorithm.");
            return;
        }

        const startNode = updatedNodes[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const finishNode = updatedNodes[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
        let visitedNodes = [];
        let visitedNodesAndPath = [];


        if(type==="bfs"){
            visitedNodesAndPath = BfsAlgorithm(updatedNodes, startNode, finishNode, TOTAL_ROWS, TOTAL_COLS);
        }else{
            visitedNodesAndPath = DfsAlgorithm(updatedNodes, startNode, finishNode, TOTAL_ROWS, TOTAL_COLS);
        }

        visitedNodes = visitedNodesAndPath[0];
        let time_end = 0;

        for (let i=0; i<visitedNodes.length; i++){
            setTimeout(() => {
                let row = visitedNodes[i].row;
                let col = visitedNodes[i].col;
                if(!nodes[row][col].isStart && !nodes[row][col].isFinish){
                    document.getElementById(`node-${row}-${col}`).className = "Node-isVisited";
                }
            }, i*20);
            time_end = i*20+500;
        }
       

        const pathNodes = visitedNodesAndPath[1];
        for(let i=0; i<pathNodes.length; i++){
            let row = pathNodes[i].row;
            let col = pathNodes[i].col;

            setTimeout(() => {
                if(!nodes[row][col].isStart && !nodes[row][col].isFinish){
                    document.getElementById(`node-${row}-${col}`).className = "Node-isPath";
                    // nodes = this.state.nodes;
                    // nodes[row][col].isPath = true;
                    // this.setState({nodes});
                }
            }, (i*25)+time_end);
        }  

    }

    randomMaze(){
        let nodes = this.state.nodes;

        // Remove all the walls
        for(let row=0; row<TOTAL_ROWS; row++){
            for(let col=0; col<TOTAL_COLS; col++){
                nodes[row][col].isWall = false;
            }
        }

        // Set current startNode and finishNode as False
        nodes[this.state.START_NODE_ROW][this.state.START_NODE_COL].isStart = false;
        nodes[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL].isFinish = false;

        const parameters = {
            nodes,
            TOTAL_ROWS,
            TOTAL_COLS,
        };

        const randomMazeValues = RandomMaze(parameters);
        this.setState({
            nodes : randomMazeValues.nodes,
            START_NODE_ROW : randomMazeValues.START_NODE_ROW,
            START_NODE_COL : randomMazeValues.START_NODE_COL,
            FINISH_NODE_ROW : randomMazeValues.FINISH_NODE_ROW,
            FINISH_NODE_COL : randomMazeValues.FINISH_NODE_COL
        });
    }

    RecursiveDivisionMaze(){
        let nodes = this.state.nodes;

        // Remove all the walls
        for(let row=0; row<TOTAL_ROWS; row++){
            for(let col=0; col<TOTAL_COLS; col++){
                nodes[row][col].isWall = false;
            }
        }

        nodes[this.state.START_NODE_ROW][this.state.START_NODE_COL].isStart = false;
        nodes[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL].isFinish = false;

        const parameters = {
            nodes,
            startRow : 0,
            startCol : 0,
            endRow : TOTAL_ROWS,
            endCol : TOTAL_COLS,
            TOTAL_ROWS,
            TOTAL_COLS
        };

        const outputParameters = RecursiveDivision(parameters);
        this.setState({
            nodes : outputParameters.updatedNodes,
            START_NODE_ROW : outputParameters.START_NODE_ROW,
            START_NODE_COL : outputParameters.START_NODE_COL,
            FINISH_NODE_ROW : outputParameters.FINISH_NODE_ROW,
            FINISH_NODE_COL : outputParameters.FINISH_NODE_COL
        });

    }
    
    render(){
        return(
            <div>
                <div class="Header">
                    
                    <button onClick = {() => this.clearWalls()}>
                        Clear Walls
                    </button>

                    <button onClick={() => this.clearBoard()}>
                        Clear Board 
                    </button>

                    <select className="Select" id="Select">
                        <option value="none">Select type of algorithm</option>
                        <option value="bfs"> bfs </option>
                        <option value="dfs"> dfs </option>                                  
                    </select>


                    <button 
                        className="VisualizeAlgorithmButton"
                        onClick = {() => this.visualizeAlgorithm(this.state.nodes)}
                    >
                        VISUALIZE ALGORITHM
                    </button>
                
                    <button
                        className = "RandomMaze" 
                        onClick={() => this.randomMaze()}
                    >
                        random maze
                    </button> 

                    <button onClick={() => this.RecursiveDivisionMaze()}
                    >
                        Recursive Division Maze
                    </button>

                </div>


                <div className = "Grid">
                    {this.renderGrid(this.state.nodes)}
                </div>

            </div>
        );
    }
}

const getNewGridStartChange = (nodes, row, col) => {
    let updatedNodes = nodes;
    updatedNodes[row][col].isStart = !nodes[row][col].isStart;
    return updatedNodes;
}

const getNewGridWithToggled = (nodes, row, col) => {
    if(nodes[row][col].isStart || nodes[row][col].isFinish){
        return nodes;
    }
    let updatedNodes = nodes.slice();
    updatedNodes[row][col].isWall = !nodes[row][col].isWall;
    return updatedNodes;
};

