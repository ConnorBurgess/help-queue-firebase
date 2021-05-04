import React from "react";
import PropTypes from "prop-types";
import Ticket from "./Ticket";
import { useSelector} from 'react-redux';
import {useFireStoreConnect, isLoaded, isEmpty, useFirestoreConnect} from 'react-redux-firebase';

function TicketList(props){
  useFirestoreConnect([
    { collection: 'tickets' }
  ]);

  const tickets = useSelector(state => state.firestore.ordered.tickets);
  // react-redux-firebase also offers a useful isLoaded() function.
  if (isLoaded(tickets)) {
    return (
      <React.Fragment>
        <hr/>
        {tickets.map((ticket) => {
          return <Ticket
            whenTicketClicked = { props.onTicketSelection }
            names={ticket.names}
            location={ticket.location}
            issue={ticket.issue}
            formattedWaitTime={ticket.formattedWaitTime}
            id={ticket.id}
            key={ticket.id}/>
        })}
      </React.Fragment>
    );
  // If the tickets aren't loaded yet, our fragment will return a "Loading..." message.
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

TicketList.propTypes = {
  onTicketSelection: PropTypes.func
};

export default TicketList;