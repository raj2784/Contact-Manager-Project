import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';


const ContactList = (props) => {
    console.log(props)

    const inputElment = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} />;
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputElment.current.value);
    };

    return (
        <div className="main">
            <h2>
                All Contacts
                <Link to="/add">
                    <button className="ui button black" style={{ marginLeft: 980 }} >ADD CONTACT</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputElment} type="text" placeholder="Search Contacts"
                        className="prompt" value={props.term} onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>

            </div>
            <div
                className="ui celled list"> {renderContactList.length > 0 ? renderContactList : "No Contacts Available"}
            </div>
        </div>
    );
};

export default ContactList;