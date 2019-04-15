import React from 'react';
import {Link} from 'react-router-dom';


const HousingItem = ({
                         housing_id, housing_name, housing_type,
                         housing_username, removeHousings, img_url, overall_comment
                     }) => (
    <div className={"col-md-3 col-sm-6"}>
        <div className="img-thumbnail housing-item">
            <img src={img_url} style={{"width": "100%"}} alt={housing_name}/>
            <div className={"caption"}>
                {housing_name}, {overall_comment || "Average"}
            </div>
            <div style={{"padding": "10px 20px 10px 20px"}}>
                <Link to={`/user/${housing_username}/housing/${housing_id}`}
                      className={"btn btn-primary"}>
                    Read
                </Link>
            </div>
        </div>
    </div>
);

export default HousingItem;