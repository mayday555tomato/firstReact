import React from 'react';
import {Link} from 'react-router-dom';

export default class IssueEdit extends React.Component {
    render() {
        return (
            <div>
                <p>
                    This is a placeholder for the Issue Edit page.
                </p>              
                <Link to="/issues">Back to issue list</Link>
            </div>
        );
    }
}
/*
IssueEdit.propType = {
    params : React.PropTypes.object.isRequred,
};
*/
