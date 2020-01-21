import React from 'react';
import Header from './header';
import Label from './label';
import Body from './body';

function StaticNote(props) {
    const {note} = props;
    return (
    <React.Fragment>
        <Header title={note.title} />
        <Body body={note.body} />
    </React.Fragment>
  );
}

export default StaticNote;