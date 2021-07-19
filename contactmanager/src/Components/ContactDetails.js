import React from 'react';
import { Link } from 'react-router-dom';
import user from '../Images/user.jpg';
import ContactList from './ContactList';

const ContactDetails = (props) => {
    const { name, email } = props.location.state.contact;
    return (
        <div className="main" style={{ marginTop: 200 }}>
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </div>
                <div>
                    <Link to="/">
                        <button className="ui button black centered" style={{ width: 290 }}>Back to Contacts</button>
                    </Link>
                </div>
            </div>

        </div >
    );
};

export default ContactDetails;