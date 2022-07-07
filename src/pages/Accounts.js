import React, { useEffect, useState } from 'react'
import { useDispatch,  } from 'react-redux';
import { getAllAccounts } from '../redux/accountSlice';
import AccountsList from '../components/accounts/AccountsList';
import AccountAdd from '../components/accounts/AccountAdd';
import useAxios from '../hooks/useAxios';

function Accounts() {
  const axiosPrivate = useAxios();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAccounts = async () => {
      try {
        const response = await axiosPrivate.get('/Accounts', {
          signal: controller.signal
        });
        isMounted && dispatch(getAllAccounts(response.data));
      } catch (err) {
        console.error(err);
      }
    }

    getAccounts();
    
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  const toggleSubmit = () => {
    setSubmit(prev => !prev);
  };

  return (
    <section>   
      <h2>Accounts page!</h2>
      <a className='btn' onClick={toggleSubmit}>Add new account</a>
      {submit && <AccountAdd />}
      <AccountsList />      
    </section>
  )
}

export default Accounts
