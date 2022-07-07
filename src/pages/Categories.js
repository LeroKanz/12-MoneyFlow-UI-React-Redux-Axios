import React, { useEffect } from 'react'
import { useDispatch,  } from 'react-redux';
import { getAllCategories } from '../redux/categorySlice';
import CategoriesList from '../components/categories/CategoriesList';
import CategoryAdd from '../components/categories/CategoryAdd';
import useAxios from '../hooks/useAxios';

function Categories() {
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
      <h2>Categories page!</h2>
      <CategoriesList />
      <CategoryAdd />
    </section>
  )
}

export default Categories
