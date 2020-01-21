import React from 'react';

function Body(props) {
    function createMarkup() {
        return {__html: props.body};
      }
      
      function Body() {
        return <div dangerouslySetInnerHTML={createMarkup()} />;
      }
    return (
    <React.Fragment>
        <Body html={props.body} />
    </React.Fragment>
  );
}

export default Body;