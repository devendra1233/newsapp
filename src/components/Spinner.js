import React from "react";
import loading from "./loader.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loading} alt="loading img"></img>
    </div>
  );
};

export default Spinner;

// Class based
// import React, { Component } from "react";
// import loading from "./loader.gif";
// export class Spinner extends Component {
//   render() {
//     return (
//       <div className="text-center">
//         <img src={loading} alt="loading img"></img>
//       </div>
//     );
//   }
// }

// export default Spinner;
