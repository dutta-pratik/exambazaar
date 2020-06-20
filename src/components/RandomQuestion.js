import React from "react";
import "../App.css";
import apiData from "../api_info/api";

class RandomQuestion extends React.Component{
    constructor(){
        super();
        
        this.state = {
            examId: null,
            previousQues: [],
            prev: false,
            queAvailableinDB: false
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
        if(jsonResponse.status == 200 && !jsonResponse.data.message){
            await this.setState({
                ...this.state,
                previousQues,
                queAvailableinDB: true
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

    handleNext = async(e) => {
        e.preventDefault();
        await this.fetchData();
    }

    handlePrevious = async(e) => {
        e.preventDefault();
        const {previousQues} = await this.state;
        console.log("before shift",previousQues.length);
        await previousQues.pop();
        await this.setState({
            ...this.state,
            previousQues,
            prev: true
        });
        console.log("after shift",previousQues.length);
        console.log("prev shift");
        // this.render();
    }

    render(){
        console.log("randomQuestion state",this.state);
        const {previousQues, prev, queAvailableinDB} = this.state;
        const display = prev  ? "No Question Available" : "Fetching";
        console.log("qstn", previousQues[previousQues.length - 1]);
        console.log("qstn len", previousQues.length - 1);
        // const {question} = previousQues[previousQues.length - 1];
        // console.log(question);
        return(
            
            <div className="random-que-container">

                {previousQues.length > 0 ? 
                    <div className="qstn-container">
                        <div className="qstn-sectionname">
                        {/* Section > Exam-name */}
                        {previousQues[previousQues.length - 1].question.exam} &nbsp; &#62; &nbsp;
                        {previousQues[previousQues.length - 1].question.test}
                        
                        </div>
                       
                        <div className="qstn-content">
                            <div className="qstn-point">
                                <span className="point-positive">
                                    +{previousQues[previousQues.length - 1].question.questions[0].marking.correct}
                                </span>
                                <span className="point-negative">
                                    {previousQues[previousQues.length - 1].question.questions[0].marking.incorrect}
                                </span>
                                
                            </div>
                            <div className="qtn-heading">
                                Question:
                            </div>
                            {previousQues[previousQues.length - 1].question.questions.map((ele) => {
                                {console.log("ele",ele)}
                                
                                return <> 
                                    
                                    
                                    <div className="qstn line-break">
                                    {/* Question */}
                                         {ele.question}
                                    </div>
                                    <div className="qstn-img">
                                        {/* if img */}
                                        {console.log("image", ele.images.length)}
                                        {ele.images.length > 0 ? 
                                            <>
                                                <div>
                                                    {ele.images.map((e)=>{
                                                        return <>
                                                                <img src={e} alt={e}/>
                                                                </>
                                                    })}
                                                </div>
                                            </> : 
                                            <></>
                                        }
                                    </div>
                                    <div className="qstn-optns" >
                                        {/* Options */}
                                        
                                        {console.log("option", ele)}
                                        {ele.mcqma ? 
                                           <>{ele.options.map((e) => {
                                                return <div className="qstn-optn" ><input type="checkbox" value={e.option} name="answer"/>
                                                         &nbsp;{e.option}
                                                        </div>
                                                       
                                            })}</> :
                                            <>{ele.options.map((e) => {
                                                return <div className="qstn-optn" ><input type="radio" value={e.option} name="answer"/>
                                                            &nbsp;<div className="line-break">{e.option}</div>
                                                        </div>
                                                       
                                            })}</>
                                        }
                                    </div>
                                </>
                               
                            })}
                            
                        </div>
                        <div className="btns">
                            {/* Buttons */}
                            <div className="prev-btn">
                                <button className="btn-effect" onClick={this.handlePrevious}>Previous</button>
                            </div>
                            <div className="nxt-btn">
                                <button className="btn-effect" onClick={this.handleNext}>Next</button>
                            </div>
                        </div> 
                    </div> :

                    // <h1>{queAvailableinDB ? display : "No available question for the selected exams"}</h1>
                    <h1>{display}</h1>
                }

            </div>
                
        );
    }
}

export default RandomQuestion;