import React from "react";
// import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
// import Moment from 'moment';
import { useFirestore } from 'react-redux-firebase'

function NewTicketForm(props){
  
  // We add the useFirestore() hook to make Firestore available to our component. (Make sure it lives *inside* the NewTicketForm component.)
  const firestore = useFirestore();

  function addTicketToFirestore(event) {
    event.preventDefault();
    props.onNewTicketCreation();
    return firestore.collection('tickets').add(
      {
        names: event.target.names.value,
        location: event.target.location.value,
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimeStamp()
      }
    );
  }

  return (
    <>
      <ReusableForm 
        formSubmissionHandler={addTicketToFirestore}
        buttonText="Help!" />
    </>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;