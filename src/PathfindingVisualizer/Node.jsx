import React from 'react';
import './Node.css';
import targetIcon from './../images/target.svg';
import startIcon from './../images/start.svg';
// const targetImage = 

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
        let icon = "";
        if(isFinish) icon = <img src={targetIcon}/>;
        if(isStart) icon = <img src={startIcon}/>;
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
                {icon}
            </div>
        );
    }
}
