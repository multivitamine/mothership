import React, {useState} from 'react';
import StaticNote from './staticNote';
import EditNote from './editNote';
import {StyledLink} from '../styled-components'

function Note(props) {
    const {saveForm, setEditable, editable} = props;
    const {note} = props;

    
    const editText = editable ? <StyledLink onClick={() => setEditable(!editable)}>Cancel editing</StyledLink> :   <StyledLink onClick={() => setEditable(!editable)}>Edit release</StyledLink>;
    const staticOrEdit = !editable ?  <StaticNote note={note} /> : <EditNote saveForm={saveForm} note={note}/>;
    return (
    <React.Fragment>
        {staticOrEdit}
        {editText}
    </React.Fragment>
  );
}

export default Note;