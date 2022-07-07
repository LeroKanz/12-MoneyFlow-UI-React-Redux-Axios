import React, { useEffect } from 'react'
import { useDispatch,  } from 'react-redux';
import { getAllCategories } from '../redux/categorySlice';
import ChildrenCategoriesList from '../components/categories/ChildrenCategoriesList';
import CategoryAdd from '../components/categories/CategoryAdd';
import useAxios from '../hooks/useAxios';
import { Link } from 'react-router-dom';


function ChildrenCategories() {
  const axiosPrivate = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get('/Categories', {
          signal: controller.signal
        });
        isMounted && dispatch(getAllCategories(response.data));
      } catch (err) {
        console.error(err);
      }
    }

    getCategories();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  return (
    <section>
      <Link to={'/categories'} className='btn'>back</Link>
      <h2>Children Categories page!</h2>
      <ChildrenCategoriesList />
      <CategoryAdd />
    </section>
  )
}

export default ChildrenCategories
