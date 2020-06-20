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
      selectedExam: null
    }
  }

  async componentDidMount(){
    console.log("mount");
    console.log(apiData.API_KEY, apiData.API_SECRET);
    const url = `https://www.exambazaar.com/api/coding-round/routes/exam-info/${apiData.API_KEY}`;

    const response = await fetch(url);
    const jsonResponse =  await response.json();
    console.log(response);
    console.log(jsonResponse);

    if(jsonResponse.status === 200){
      console.log("Got data");
      this.setState({
        allData: jsonResponse.data,
        stream: jsonResponse.data.streams
      });
    }
    console.log("state", this.state);
  }

  handleStream = (e) => {
    console.log("change", e.target.value);
    const {allData} = this.state;
    console.log("alldata",allData);
    const relevantExam = allData.exams.filter((ele) => {
      return e.target.value == ele.stream;
    });
    this.setState({
      ...this.state,
      selectedStream: e.target.value,
      exam: relevantExam
    });
    console.log("handleStream State", this.state);
  }

  handleExam = (e) => {
    console.log("exam id", e.target.value);
    this.setState({
      ...this.state,
      selectedExam: e.target.value
    });
    console.log("handleExam State", this.state);
  }


  render(){
    const {exam, stream, selectedStream, selectedExam} = this.state;
    console.log("render", this.state);

    return (
      <div className="App">
        <NavBar />

        <Router>
          <div className="container">
            {/* <Stream streams={stream} onStreamChange={this.handleStream}/>
              {selectedStream != null ?
                <Exam exams={exam} onExamChange={this.handleExam}/> :
                <h4>Please Select Stream to see the relevent exams</h4> 
              } */}
            <Route exact={true} path="/" render={() => {
              return <HomePage selectedExam={selectedExam} stream={stream} handleStream={this.handleStream} selectedStream={selectedStream} exam={exam} handleExam={this.handleExam}/>
            }}/>
          
            {/* <Link to={`/random/${selectedExam}`}>
              <button className="submit-btn">Get Questions</button>
            </Link> */}
            
            <Route path="/random/:examId" render={() => {
              return <RandomQuestion />
            }} />
          </div>
          </Router>
        
        <hr></hr>
        
      </div>
    );
  }
}


export default App;

