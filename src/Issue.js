import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import "./Issue.css"

class Issue extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.onClick(this.props.issueIdx);
    }

    render() {
        const { title, number, state, created_at, body } = this.props.data;
        const { login, html_url } = this.props.data.user;

        const { showDetails } = this.props;

        let userInfo = null;
        let detailInfo = null;

        if (showDetails) {
            userInfo = 
                <div className="userDetails">
                    <p><b>Created by: </b></p>
                    <a href={html_url}>{login}</a>
                </div>
            detailInfo = 
            <div>
                 <div>
                     <p><b>Created on: </b><Moment date={created_at} /></p>
                </div>
                <div>
                    <p><b>Description:</b> </p>
                    <p>{body}</p>
                </div>
            </div>
           
            
        }


        return(
            <div className="issueBox" onClick={this.handleClick}>
                <h3>{title}</h3>
                {userInfo}
                <div className="issueBoxDetails">
                    <p><b>Issue </b>#{number} </p>
                    <p><b>State: </b>State: {state}</p>
                </div>
                {detailInfo}
            </div>
        );
    }
}

export default Issue;