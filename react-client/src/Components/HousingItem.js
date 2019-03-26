import React from 'react';
import Moment from 'react';
import {Link} from 'react-router-dom';


const HousingItem = ({
                         housing_id, housing_name, housing_type,
                         username, removeHousings, img_url
                     }) => (
    <div className={"col-md-3 col-sm-6"}>
        <div className="img-thumbnail housing-item">
            <img src={img_url} style={{"width": "100%"}}/>
            <div className={"caption"}>
                {housing_name}, {housing_type}
            </div>
            <div style={{"padding": "10px 20px 10px 20px"}}>
                <Link to={`/user/${username}/housing/${housing_id}`}
                      className={"btn btn-primary"}>
                    Read
                </Link>
            </div>
        </div>
    </div>
);

export default HousingItem;