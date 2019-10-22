import React from 'react';
import './Node.css';

export default class Node extends React.Component{
    render(){
        const {
            key,
            col,
            row,
            isStart,
            isFinish,
            isVisited,
            isWall,      
            isPath,
        } = this.props;

        let extendedClassName = "";

        if(isStart){
            extendedClassName = "-isStart";
        }else if (isFinish){
            extendedClassName = "-isFinish";
        }else if (isWall){
            extendedClassName = "-isWall";
        }else if (isPath){
            extendedClassName = "-isPath";
        }else if (isVisited){
            extendedClassName = "-isVisited";
        }else{
            extendedClassName = "";
        }

        const className = "Node" + extendedClassName;
        let target = "";
        if(isFinish) target = "🎯";
        return(
            <div 
                id = {`node-${row}-${col}`}
                className = {className}
                // onClick = {() => this.props.onClick()}
                onMouseDown = {() => this.props.onMouseDown(row, col)}
                onMouseEnter = {() => this.props.onMouseEnter(row, col)}
                onMouseLeave = {() => this.props.onMouseLeave(row, col)}
                onMouseUp = {() => this.props.onMouseUp(row, col)}
            >
                {/* {target} */}
            </div>
        );
    }
}
