/*******************IMPORTING FILES AND PACKAGES**********************/
import React from 'react';
import "../App.css";

/*******************STREAM FUNCTIONAL COMPONENT**********************/
function Stream(props){
  /*******************OBJECT DESTRUCTURING**********************/
  const {streams, onStreamChange} = props;
  
  return (
    /*******************RETURNING COMPONENT**********************/
    <div className="stream" >
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

 /*******************EXPORTING STREAM COMPONENT**********************/
export default Stream;