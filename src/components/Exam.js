/*******************IMPORTING FILES AND PACKAGES**********************/
import React from "react";
import "../App.css";

/*******************EXAM FUNCTIONAL COMPONENT**********************/
function Exam(props){
    /*******************OBJECT DESTRUCTURING**********************/
    const {exams, onExamChange} = props;
    return(
        /*******************RETURNING COMPONENT**********************/
        <div className="exam">
            Exam: &nbsp;
            <select onChange={onExamChange}>
                {exams.map((ele) => {
                    return <option key={ele._id} value={ele._id}>{ele.name}</option>
                })}
            </select>
        </div>
    );
}
 /*******************EXPORTING EXAM COMPONENT**********************/
export default Exam;