import React from 'react';
import { Link } from '@mui/material';

function EmailLink(props) {
    const { children } = props;

    return (
        <Link href={`mailto:${children}`} underline="hover">
            {children}
        </Link>
    );
}

export default EmailLink;
