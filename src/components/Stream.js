
import React from 'react';
import "../App.css";

function Stream(props){
  console.log("stream props",props);
  const {streams, onStreamChange} = props;
  console.log("strem", streams);
  console.log("onStreamChange", onStreamChange);
  

  return (
    <div className="stream" >
      {console.log("here", streams)}
      Stream: &nbsp;
      <select onClick={onStreamChange}>
        {streams != null ?
          
          streams.map((ele) => {
            return <option key={ele._id} value={ele._id} >{ele.name}</option>
          }) :

          <option>Loading</option>
        }
      </select>
    </div>
  );
  
}

// class Stream extends React.Component{
  
//   render(){
//     console.log("pp",this.state);
//     return(
//       <div>

//       </div>
//     );
//   }
// }

export default Stream;