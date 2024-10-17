import React, {useEffect} from 'react';
import {withOnyx} from 'react-native-onyx';
import SAMLLoadingIndicator from '@components/SAMLLoadingIndicator';
import CONFIG from '@src/CONFIG';
import ONYXKEYS from '@src/ONYXKEYS';
import type {SAMLSignInPageOnyxProps, SAMLSignInPageProps} from './types';
import CONST from '@src/CONST';

function SAMLSignInPage({credentials}: SAMLSignInPageProps) {
    useEffect(() => {
        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials?.login, referer: CONFIG.EXPENSIFY.EXPENSIFY_CASH_REFERER}),
        };

        fetch('https://www.expensify.com.dev/saml-login/', fetchOptions);
       // window.location.replace(`${url}?email=${credentials?.login}&referer=${CONFIG.EXPENSIFY.EXPENSIFY_CASH_REFERER}`);
    }, [credentials?.login]);

    return <SAMLLoadingIndicator />;
}

SAMLSignInPage.displayName = 'SAMLSignInPage';

export default withOnyx<SAMLSignInPageProps, SAMLSignInPageOnyxProps>({
    account: {key: ONYXKEYS.ACCOUNT},
    credentials: {key: ONYXKEYS.CREDENTIALS},
})(SAMLSignInPage);
