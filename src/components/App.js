import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

import apiData from "../api_info/api";
import Stream from "./Stream";
import Exam from "./Exam"
import NavBar from "./NavBar";
import RandomQuestion from "./RandomQuestion";
import HomePage from "./HomePage";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      allData: null,
      exam: null,
      stream: null,
      selectedStream: null,
      selectedExam: null,
      homePage: true
    }
  }

  async componentDidMount(){
    const url = `https://www.exambazaar.com/api/coding-round/routes/exam-info/${apiData.API_KEY}`;

    const response = await fetch(url);
    const jsonResponse =  await response.json();

    if(jsonResponse.status === 200){
      
      this.setState({
        allData: jsonResponse.data,
        stream: jsonResponse.data.streams
      });
    }
    
  }

  handleStream = (e) => {
    
    const {allData} = this.state;
    
    const relevantExam = allData.exams.filter((ele) => {
      return e.target.value == ele.stream;
    });
    this.setState({
      ...this.state,
      selectedStream: e.target.value,
      exam: relevantExam
    });
    
  }

  handleExam = (e) => {
    console.log("exam id", e.target.value);
    this.setState({
      ...this.state,
      selectedExam: e.target.value
    });
    
  }


  render(){
    const {exam, stream, selectedStream, selectedExam, homePage} = this.state;

    return (
      <div className="App">
       
        <Router>
          <NavBar/>

          <div className="container">
            
            <Route exact={true} path="/" render={() => {
              return <HomePage selectedExam={selectedExam} stream={stream} handleStream={this.handleStream} selectedStream={selectedStream} exam={exam} handleExam={this.handleExam}/>
            }}/>
          
            <Route path="/random/:examId" component={RandomQuestion} />
          </div>
        </Router>
        
      </div>
    );
  }
}


export default App;

