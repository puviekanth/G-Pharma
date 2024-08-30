import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

export default function ListEmployee() {
  return (
    <div>
        <div className="content-wrapper">
        <div className='with-categories'>
        <div className='categories'>
            <ul>
                <li>Order</li>
                <li>Products</li>
                <li>Supplier</li>
                <li>Employee</li> 
            </ul>
            <div className="icon">
                <div className='profile-icon'>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
                <div className='signout-icon'>
                    <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                </div>
            </div>
        </div>
        </div>
    <div class='employee-list'>
        <h2>Employee Details</h2>
        <div class="employee-search">
            <input type="text" id="searchBar" placeholder="Search employees..." oninput="filterEmployees()"/>
        </div>
        <button type='submit' id='addEmp'>+Add Employee</button>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>John</td>
                    <td>102</td>
                    <td>john@gmail.com</td>
                    <th>23</th>
                    <td>Driver</td>
                    <th>0701299902</th>
                    <td>
                        <button class='edit-btn'>Edit </button>
                        <button class='delete-btn'>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>John</td>
                    <td>102</td>
                    <td>john@gmail.com</td>
                    <th>23</th>
                    <td>Driver</td>
                    <th>0701299902</th>
                    <td>
                        <button class='edit-btn'>Edit </button>
                        <button class='delete-btn'>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</div>
  )
}
