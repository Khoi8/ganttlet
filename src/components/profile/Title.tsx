import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
interface Props {
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
}

export default function Title(props: Props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};
