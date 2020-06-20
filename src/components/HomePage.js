import React from "react";

import Stream from "./Stream";
import Exam from "./Exam";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";


const HomePage = (props) => {
    console.log("homepage", props);
    const {selectedExam, stream, handleStream, exam, handleExam, selectedStream} = props;
    console.log("stream", {stream});
    // console.log("HM", state)
    return(
        <div>
            <Stream streams={stream} onStreamChange={handleStream}/>
            {selectedStream != null ?
            <Exam exams={exam} onExamChange={handleExam}/> :
            <h4>Please Select Stream to see the relevent exams</h4> 
            }
            <Link to={`/random/${selectedExam}`}>
              <button className="submit-btn">Get Questions</button>
            </Link>
        </div>
    );
}

export default HomePage;