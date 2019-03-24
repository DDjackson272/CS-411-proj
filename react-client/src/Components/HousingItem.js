import React from 'react';
import Moment from 'react';
import {Link} from 'react-router-dom';


const HousingItem = ({username, address, removeHousings, isCorrectUser}) => (
    <div>
        <li className="list-group-item">
            Housing address: {address}, posted by: {username}.
            {isCorrectUser && (
                <a className={"btn btn-danger"} onClick={removeHousings}>
                    Delete
                </a>
            )}
        </li>
    </div>
);

export default HousingItem;