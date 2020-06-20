import React from 'react';
import '../App.css';

import apiData from "../api_info/api";
import Stream from "./Stream";
import Exam from "./Exam"

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

        <Stream streams={stream} onStreamChange={this.handleStream}/>
        {selectedStream != null ?
          <Exam exams={exam} onExamChange={this.handleExam}/> :
          <h4>Please Select Stream to see the relevent exams</h4> 
        }

      </div>
    );
  }
}


export default App;

