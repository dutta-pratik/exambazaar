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
        const response = await fetch(url, options);
        const jsonResponse = await response.json();
        await previousQues.push(jsonResponse.data);
        if(jsonResponse.status == 200 && !jsonResponse.data.message){
            await this.setState({
                ...this.state,
                previousQues,
                queAvailableinDB: true
            })
        }
    }

    async componentDidMount(){
        const { match: { params } } = await this.props;
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
        await previousQues.pop();
        await this.setState({
            ...this.state,
            previousQues,
            prev: true
        });
    }

    render(){
        const {previousQues, prev, queAvailableinDB} = this.state;
        const display = prev  ? "No Question Available" : "Fetching";
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
                                
                                {previousQues[previousQues.length - 1].question.questions[0].marking ? 
                                     <><span className="align-marks">Marks: </span><span className="point-positive">
                                        +{previousQues[previousQues.length - 1].question.questions[0].marking.correct}
                                    </span>
                                    <span className="point-negative">
                                        {previousQues[previousQues.length - 1].question.questions[0].marking.incorrect}
                                    </span></> :
                                    <></>
                                }
                                    
                            </div>

                            <div className="qtn-heading">
                                Question:
                            </div>

                            {previousQues[previousQues.length - 1].question.context ?
                                <> {previousQues[previousQues.length - 1].question.context} </>:
                                <></>
                                
                            }
                            
                            
                            {previousQues[previousQues.length - 1].question.questions.map((ele, i) => {
                              
                                return <div key={i}> 
                                        <div  className="qstn line-break">
                                        {/* Question */}
                                            {ele.question}
                                        </div>
                                        <div className="qstn-img">
                                            {/* if img */}
                                        
                                            {ele.images.length > 0 ? 
                                                <>
                                                    <div>
                                                        {ele.images.map((e, i)=>{
                                                            return <>
                                                                    <img key={i} className="img" src={e} alt={e}/>
                                                                    </>
                                                        })}
                                                    </div>
                                                </> : 
                                                <></>
                                            }
                                        </div>
                                        <div className="qstn-optns" >
                                            {/* Options */}
                                            
                                            
                                            {ele.type == "mcq" ?
                                                <>{ele.mcqma ? 
                                                    <>{ele.options.map((e, i) => {
                                                        return <div key={i} className="qstn-optn" ><input type="checkbox" value={e.option} name="answer"/>
                                                                &nbsp;{e.option}
                                                                </div>
                                                                
                                                    })}</> :
                                                    <>{ele.options.map((e , i) => {
                                                        return <div key={i} className="qstn-optn" ><input type="radio" value={e.option} name="answer"/>
                                                                    &nbsp;<div className="line-break">{e.option}</div>
                                                                </div>
                                                                
                                                    })}</>
                                                } </> : 
                                                <>{ele.options.map((e ,i) => {
                                                    return <div key={i} className="qstn-optn"><input type="text" name="answer" placeholder="Enter your Answer"/>
                                                            &nbsp;<button className="btn-effect">Submit</button>
                                                            </div>
                                                        
                                                })}</>
                                            }
                                            
                                        </div>
                                </div>
                               
                            })}
                            
                            <div>
                                {previousQues[previousQues.length - 1].question.images && previousQues[previousQues.length - 1].question.images.length > 0 ? 
                                     <>
                                    {previousQues[previousQues.length - 1].question.images.map((e, i) => {
                                        
                                        return <><img key={i} className="img" src={e} alt="img"/></>
                                    })}</> :
                                    <></>
                                }
                            </div>

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

                    <h1>{display}</h1>
                }

            </div>
                
        );
    }
}

export default RandomQuestion;