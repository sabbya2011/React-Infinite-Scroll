import React,{Component} from 'react';
import fetch from 'isomorphic-fetch';
import ContactItem from './contact';

const url = `https://student-example-api.herokuapp.com/v1/contacts.json`;

class ContactList extends Component{
    state={
        contacts:[],
        perPageItems:8,
        currentPage:1,
        totalPages:null,
        scrolling:false
    }
    componentDidMount(){
        this.loadComponents();
        this.scrollListener = window.addEventListener('scroll',(e)=>{this.handleScroll(e)});
    }
    handleScroll(event){
        const {scrolling,totalPages,currentPage} = this.state;
        if(scrolling) return;
        if(currentPage>totalPages) return;
        const lastItem = document.querySelector('.contacts-list > div:last-child');
        const lastItemOffset = lastItem.offsetTop+lastItem.clientHeight;
        const pageOffset = window.pageYOffset+window.innerHeight;
        var bottomOffset = 20;
        // console.log(`pageOffset : ${pageOffset} || `);
        if(pageOffset>lastItemOffset - bottomOffset) this.loadMoreItems();
    }
    async loadComponents(){
        const {contacts,perPageItems,currentPage} = this.state;
        let res = await fetch(url+`?per=${perPageItems}&page=${currentPage}`);
        res = await res.json();
        this.setState({
            contacts:[...contacts,...res.contacts],
            scrolling:false,
            totalPages:res.total_pages
        });
    }
    loadMoreItems(){
        this.setState(prevState=>({
            currentPage:prevState.currentPage+1,
            scrolling:true
        }),this.loadComponents)
    }
    renderContacts(){
        return this.state.contacts.map((contact,index)=><ContactItem key={index} contact={contact}/>);
    }
    render(){
        return(
            <div>
                {this.renderContacts()}
                {/* <button onClick={()=>this.loadMoreItems()}>Load More ...</button> */}
            </div>
        );
    }
}
export default ContactList;