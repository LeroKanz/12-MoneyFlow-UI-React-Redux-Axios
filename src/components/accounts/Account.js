import { useState } from 'react';
import Card from '../../ui/Card';
import classes from './Account.module.css';
import { useDispatch } from 'react-redux';
import { removeAccount } from '../../redux/accountSlice';
import { axiosPrivate } from '../../api/axios';
import UpdateAccount from './UpdateAccount';


const Account = ({ id, name, accountType, lastFourDigitsOfCard, ...accountsCurrencies }) => {

  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  const toggleSubmit = () => {
    setSubmit(prev => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axiosPrivate.delete(`/Accounts/${id}`);
    dispatch(removeAccount({ id }));
  };  

  return (
    <li className={classes.item}>
      <Card>
        <blockquote>
          <p><i><small>name:</small></i>{name}</p>
          <p><i><small>type:</small></i>{accountType}</p>
          <p><i><small>card №: ...</small></i>{lastFourDigitsOfCard}</p>
          {accountsCurrencies.accountsCurrencies.map((ac) => 
          (<p><p><i><small>amount:</small></i>{ac.amount}</p>
          <p><i><small>currency:</small></i>{ac.currencyId}</p></p>))}
                 
        </blockquote>
      </Card>
      <div>
        <a className='btn' onClick={submitHandler}>
          Delete Account
        </a>
        <a className='btn' onClick={toggleSubmit}>
          For Update
        </a>
      </div>
      <div>{submit && <UpdateAccount key={id} id={id} />}</div>
    </li >
  );
};

export default Account;
