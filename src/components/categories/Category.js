import { useRef } from 'react';
import { Link } from 'react-router-dom'
import classes from './Category.module.css';
import { useDispatch } from 'react-redux';
import { removeCategory, updateCategory } from '../../redux/categorySlice';
import { axiosPrivate } from '../../api/axios';


const Category = ({ id, name }) => {
  const dispatch = useDispatch();
  const nameUpdateRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axiosPrivate.delete(`/Categories/${id}`);
    dispatch(removeCategory({ id }));
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    const updatedName = nameUpdateRef.current.value;
    const response = await axiosPrivate.put(`/Categories/${id}`,
    {
      name: updatedName
    });
    dispatch(updateCategory(response.data));
  };
    
  return (
    <li className={classes.item}>
      <blockquote>
        <p>{name}</p>
      </blockquote>
      <div>
        <a className='btn' onClick={submitHandler}>
          Delete Category
        </a>
        <Link to={`/children-categories/${id}`} className='btn'>Get Children</Link>
          <a className='btn' onClick={submitUpdateHandler}>
            Update Category
          </a>
          <div>
            <label htmlFor='name'>update</label>
            <input type='text' id='name' ref={nameUpdateRef} />
          </div>
      </div>
    </li >
  );
};

export default Category;
