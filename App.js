import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase'
//import materialize from 'materialize'
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            val:"",
            operations:[]
        }
    }
    storeData() {
        // var Firebase = require('firebase')
        var opRef = firebase.database().ref('operations');
        var newOpRef = opRef.push();
        newOpRef.set({
            input1:this.state.val
        });
        //Firebase.database.ref('operations')
        //opRef.set({input:this.state.val});
    }
    readData() {
        var starCountRef = firebase.database().ref('operations');
        var callBack = function(snapshot) {
	        //updateStarCount(postElement, snapshot.val());
	        //--------snapshot is json object--------
	        console.log(snapshot.val());
	        var newops = []
	        var data = snapshot.val();
	        for (var key in data) {
		        var op = data[key];
		        //console.log(op.input1);
		        newops.push(op.input1);
	        }
	        this.setState({operations:newops});
        }.bind(this)

        starCountRef.on('value', callBack);
    }
    componentDidMount() {
        //console.log("Mounted");
        this.readData();
    }
    render() {

        //console.log("Rendered");
        return (
            <div>
	            <header className="App-header">
	            <img src={logo} className="App-logo" alt="logo" />
	            <h1 className="App-title">Welcome to React</h1>
	            </header>
	            <p className="App-intro">

	            </p>
	            <div className="container">
		            <h2>again</h2>
		            <input type = "text" id ="input1" value={this.state.val} onChange={(e)=>{
			            this.setState(   {val:e.target.value});
			        }} />
		            <br />
		            <button className="btn" onClick={()=>{
		            	this.storeData();
		            }}>click me</button>
		            <br/>
		            <br/>
		            <br/>
		            <div className="collection">
		            {
			            this.state.operations.map((op, i)=>{
				            // return (
				            // 	<div key={i} onClick={()=>{
				            // 		console.log(op);
				            // 	}} className="collection-item">{i + " : " + op}</div>
				            // );
			            	return (
				            	<a key={i} href={"http://www.google.com/search?q="+op} target="_blank" className="collection-item">{i + " : " + op}</a>
				            );
			            })
		            }
		            </div>
	            </div>
            </div>
        );
    }
}

export default App;
