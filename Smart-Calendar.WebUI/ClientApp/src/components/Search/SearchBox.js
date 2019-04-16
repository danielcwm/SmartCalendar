import React from "react";
import { Input } from "semantic-ui-react";

const SearchBox = props => {
    return (
        <React.Fragment>
            <Input
                inverted
                transparent
                size='huge' 
                icon="search"
                iconPosition="left"
                placeholder="Search Employee..."
                onChange={props.searchChange}
            />
        </React.Fragment>
    );
};

export default SearchBox;