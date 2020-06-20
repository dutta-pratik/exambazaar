import React from 'react';
import '../App.css';

import apiData from "../api_info/api";
import Stream from "./stream";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
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
        stream: jsonResponse.data.streams
      });
    }
    console.log("state", this.state);
  }

  handleExam (){
    console.log("change");
  }

  render(){
    const {exam, stream} = this.state;
    return (
      <div className="App">
        <Stream streams={stream} onStreamChange={this.handleExam}/>
      </div>
    );
  }
}


export default App;

