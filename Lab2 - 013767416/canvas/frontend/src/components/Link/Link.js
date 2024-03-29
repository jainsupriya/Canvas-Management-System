import React, {Component} from 'react';

const STATUS = {
    HOVERED: 'hovered1',
    NORMAL: 'normal',
};

class Link extends Component{
    
    constructor(props){
        super(props);
        console.log(props);

        this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
    }

    _onMouseEnter() {
        this.setState({class: STATUS.HOVERED});
      }
    
      _onMouseLeave() {
        this.setState({class: STATUS.NORMAL});
      }


      render(){
          return(
              
                  <a
            className={this.state.class}
            href={this.props.page || '#'}
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}
          >
            {this.props.children} Link
          </a>
              
            

          );
      }


    
}

export default Link;