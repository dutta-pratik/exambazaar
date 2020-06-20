
import React from 'react';


function Stream(props){
  console.log("stream props",props);
  const {streams, onStreamChange} = props;
  console.log("strem", streams);
  console.log("handleExam", onStreamChange);
  

  return (
    <div>
      {console.log("here", streams)}
      <select onSelect={onStreamChange}>
        {streams != null ?

          streams.map((ele, key) => {
            return <option key={ele._id} >{ele.name}</option>
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