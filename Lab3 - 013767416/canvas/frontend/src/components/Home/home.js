import React,{Component} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
//import Caraousal from './Caraousal';
import Caraousal from './Caraousal';


class Home extends Component{
    render()
    {
        return(
        <div >  
            <Caraousal/>
        </div>
        )
    }
};

export default Home;