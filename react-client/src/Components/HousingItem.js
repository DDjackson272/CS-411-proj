import React from 'react';
import Moment from 'react';
import {Link} from 'react-router-dom';


const HousingItem = ({username, address}) => (
    <div>
        <li className="list-group-item">
            Housing address: {address}, posted by: {username}.
        </li>
    </div>
);

export default HousingItem;