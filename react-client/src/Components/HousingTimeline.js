import React, {Component} from 'react';
import HousingList from "../Containers/HousingList"

class HousingTimeline extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <HousingList
                    {...this.props}
                />
            </div>
        )
    }

}

export default HousingTimeline;