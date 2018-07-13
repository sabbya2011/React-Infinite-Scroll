import React from 'react';

const contactItem = ({contact})=>{
    return(
        <div className="contact" style={{border:'1px solid violet',margin:'10px',padding:'10px'}}>
            <div>{contact.name}</div>
            <div>{contact.email}</div>
            <div>{contact.phone}</div>
            <div>{contact.address} {contact.suite}</div>
            <div>{contact.city} {contact.state} , {contact.zip}</div>
        </div>
    )
}
export default contactItem;