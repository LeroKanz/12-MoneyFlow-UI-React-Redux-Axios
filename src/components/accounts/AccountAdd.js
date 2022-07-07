import { useEffect, useRef, useState } from 'react';
import Card from '../../ui/Card';
import classes from './AccountAdd.module.css';
import { useDispatch, } from 'react-redux';
import { addAccount } from '../../redux/accountSlice';
import { axiosPrivate } from '../../api/axios';
import LoadingSpinner from '../../ui/LoadingSpinner'
import Select from 'react-select';
import { selectErrors } from '../../errorsHandler/errors';


const AccountAdd = () => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const lastFourDigitsOfCardInputRef = useRef();
  const bankAccountNumberInputRef = useRef();
  const amountInputRef = useRef();

  const [currencyTypes, SetCurrencyTypes] = useState({});
  const [accountTypes, SetAccountTypes] = useState({});

  useEffect(() => {
    const getCurrencyTypes = async () => {
      try {
        const response = await axiosPrivate.get('/CurrencyTypes');
        SetCurrencyTypes(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getCurrencyTypes();
  }, []);

  useEffect(() => {
    const getAccountTypes = async () => {
      try {
        const response = await axiosPrivate.get('/AccountTypes');
        SetAccountTypes(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getAccountTypes();
  }, []);

  let currencies = [];
  let accounts = [];

  Object.entries(currencyTypes).forEach(([key, value]) => currencies.push({ value: key, label: value }));
  Object.entries(accountTypes).forEach(([key, value]) => accounts.push({ value: key, label: value }));

  const [selectedCurrencyOption, setSelectedCurrencyOption] = useState(null);
  const [selectedAccountOption, setSelectedAccountOption] = useState(null);

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [submit, setSubmit] = useState('');


  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredaccountType = selectedAccountOption.value;
    const enteredlastFourDigitsOfCard = lastFourDigitsOfCardInputRef.current.value;
    const enteredbankAccountNumber = bankAccountNumberInputRef.current.value;
    const enteredcurrencyId = selectedCurrencyOption.value;
    const enteredamount = amountInputRef.current.value;

    try {
      setSubmit(true);
      const response = await axiosPrivate.post('/Accounts', {
        name: enteredName, accountType: enteredaccountType,
        lastFourDigitsOfCard: enteredlastFourDigitsOfCard, bankAccountNumber: enteredbankAccountNumber,
        currencyId: enteredcurrencyId, amount: enteredamount
      });
      if (response) {
        dispatch(addAccount(response.data));
        setSubmit(false);
      }
    } catch (error) {
      setSubmit(false);
      setErrorMsg(selectErrors(error));
      errorRef.current.focus();
    }
  }

  return (
    <Card>
      <p ref={errorRef} className={errorMsg ? `${classes.errormsg}` : `${classes.offscreen}`} aria-live="assertive">{errorMsg}</p>
      {submit && <LoadingSpinner />}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Account name</label>
          <input type='text' id='name' ref={nameInputRef} />
          <label htmlFor='lastFourDigitsOfCard'>Last For Digits Of Card</label>
          <input type='text' id='lastFourDigitsOfCard' ref={lastFourDigitsOfCardInputRef} />
          <label htmlFor='bankAccount'> Bank Account Number</label>
          <input type='text' id='bankAccount' ref={bankAccountNumberInputRef} />
          <label htmlFor='amount'>Amount</label>
          <input type='text' id='amount' ref={amountInputRef} />
          <p>Currency Type</p>
          <Select
            defaultValue={selectedCurrencyOption}
            onChange={setSelectedCurrencyOption}
            options={currencies}
            value={selectedCurrencyOption}
          />
          <p>Account Type</p>
          <Select
            defaultValue={selectedAccountOption}
            onChange={setSelectedAccountOption}
            options={accounts}
            value={selectedAccountOption}
          />
        </div>
        <div className={classes.actions}>
          <button className='btn' disabled={submit}>Add Account</button>
        </div>
      </form>
    </Card>
  );
};

export default AccountAdd;
