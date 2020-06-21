/*******************IMPORTING FILES AND PACKAGES**********************/
import React from "react";
import ExamLogo from "../exams.svg"
import Stream from "./Stream";
import Exam from "./Exam";
import {Link} from "react-router-dom";

/*******************HOMEPAGE FUNCTIONAL COMPONENT**********************/
const HomePage = (props) => {
    /*******************OBJECT DESTRUCTURING**********************/
    const {selectedExam, stream, handleStream, exam, handleExam, selectedStream} = props;
    return(
        /*******************RETURNING COMPONENT**********************/
        <div>
            <img className="img exam-logo" src={ExamLogo} alt="img"></img>
            <Stream streams={stream} onStreamChange={handleStream}/>
            {selectedStream != null ?
            <Exam exams={exam} onExamChange={handleExam}/> :
            <h4>Please Select Stream to see the relevent exams</h4> 
            }
            <Link to={`/random/${selectedExam}`}>
                {selectedExam && selectedStream ? 
                    <button className="submit-btn btn-effect">Get Questions</button> :
                    <button className="submit-btn disable-btn" disabled={true}>Select Stream & Exam</button>
                }
              
            </Link>
        </div>
    );
}
 /*******************EXPORTING HOMEPAGE COMPONENT**********************/
export default HomePage;