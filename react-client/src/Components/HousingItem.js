import React from 'react';
import Moment from 'react';
import {Link} from 'react-router-dom';


const HousingItem = ({housing_id, housing_name, city,
                         username, address, removeHousings, isCorrectUser, img_url}) => (
    <div>
        <li className="list-group-item">
            <img
                src={img_url}
                alt={username}
                className={"timeline-image"}
            />
            <div>
                {housing_name}: {address}, {city}.
            </div>
            <div>
                <Link to={"/"}>@{username} &nbsp;</Link>
            </div>
            {isCorrectUser && (
                <div>
                    <a className={"btn btn-danger"}
                       onClick={removeHousings}
                       href={"/"}>
                        Delete
                    </a>
                    <Link to={`/user/${username}/housing/${housing_id}/update`}
                          className={"btn btn-warning"}
                          style={{"marginTop":10}}>
                        Modify
                    </Link>
                </div>
            )}
        </li>
    </div>
);

export default HousingItem;