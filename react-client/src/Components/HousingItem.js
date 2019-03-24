import React from 'react';
import Moment from 'react';
import {Link} from 'react-router-dom';


const HousingItem = ({city, username, address, removeHousings, isCorrectUser}) => (
    <div>
        <li className="list-group-item">
            Housing address: {address}, {city}. It is posted by: {username}.
            {isCorrectUser && (
                <a className={"btn btn-danger"} onClick={removeHousings}>
                    Delete
                </a>
            )}
        </li>
    </div>
);

export default HousingItem;