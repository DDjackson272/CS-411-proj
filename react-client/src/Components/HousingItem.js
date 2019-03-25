import React from 'react';
import Moment from 'react';
import {Link} from 'react-router-dom';


const HousingItem = ({housing_id, housing_name,
                         username, removeHousings, img_url}) => (
    <div>
        <li className="list-group-item">
            <img
                src={img_url}
                alt={username}
                className={"timeline-image"}
            />
            <div>
                {housing_name}.
            </div>
            <div>
                <Link to={`/user/${username}/housing/${housing_id}`} className={"btn btn-primary"}>
                    Read
                </Link>
            </div>
        </li>
    </div>
);

export default HousingItem;