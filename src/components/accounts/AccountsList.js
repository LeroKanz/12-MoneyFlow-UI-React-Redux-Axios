import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Account from './Account';
import classes from './AccountsList.module.css';

const AccountsList = () => {
  const accounts = useSelector(state => state.forAccounts.accounts);
  
  return (
    <Fragment>
      <ul className={classes.list}>
        {accounts.map((account) => (
          <Account
            key={account.id}
            {...account}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default AccountsList;
