import React from "react";
import "../App.css";
import apiData from "../api_info/api";

class RandomQuestion extends React.Component{
    constructor(){
        super();
        
        this.state = {
            examId: null,
            previousQues: []
        }
    }

    fetchData = async () => {
        const {examId, previousQues} = this.state;
        const url = "https://www.exambazaar.com/api/coding-round/routes/random-question";
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                api_key: `${apiData.API_KEY}`, 
                api_secret: `${apiData.API_SECRET}`,
                examId: `${examId}`
            })
        }  
        console.log("options", options);
        const response = await fetch(url, options);
        const jsonResponse = await response.json();
        console.log("json RQ",jsonResponse);
        console.log("prevw", previousQues);
        await previousQues.push(jsonResponse.data);
        console.log("prev", previousQues);
        if(jsonResponse.status == 200){
            await this.setState({
                ...this.state,
                previousQues
            })
        }
        console.log("rq state", this.state);
    }

    async componentDidMount(){
        const { match: { params } } = await this.props;
        console.log("CM",this.props, "as", params);
        await this.setState({
            ...this.state,
            examId: params.examId
        });
        await this.fetchData();
    }

    render(){
        console.log("randomQuestion state",this.state);
        const {previousQues} = this.state;
        console.log("qstn", previousQues[previousQues.length - 1]);
        // const {question} = previousQues[previousQues.length - 1];
        // console.log(question);
        return(
            
            <div>

                {previousQues.length > 0 ? 
                    <div className="qstn-container">
                        <div className="qstn-sectionname">
                        {/* Section > Exam-name */}
                        {previousQues[previousQues.length - 1].question.exam} &nbsp; > &nbsp;
                        {previousQues[previousQues.length - 1].question.test}
                        </div>
                        <div className="qstn-content">
                            <div className="qstn">
                                {/* Question */}
                            </div>
                            <div className="qstn-testname">
                                {/* testname */}
                            </div>
                            <div className="qstn-img">
                                {/* if img */}
                            </div>
                            <div className="qstn-optns">
                                {/* Options */}
                            </div>
                        </div>
                        <div className="btns">
                            {/* Buttons */}
                            <div className="prev-btn">
                                <button className="btn-effect">Previous</button>
                            </div>
                            <div className="nxt-btn">
                                <button className="btn-effect">Next</button>
                            </div>
                        </div> 
                    </div> :

                    <h1>Fetching</h1>
                }

            </div>
                
        );
    }
}

export default RandomQuestion;