import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div >
             
             <input type="text" name="search" id="search" className="form-control form-control-lg" placeholder="Search" 
                    onChange={this.props.searchProduct} style={{height:30}} />
               
            </div>
        )
    }
}

export default Search;