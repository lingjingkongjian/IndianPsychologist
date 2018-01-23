/**
 * Created by jonathanlehner on 07.01.18.
 */
import { Accounts } from 'meteor/std:accounts-ui'

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
    forbidClientAccountCreation: false

});
