import { useRef } from 'react';
import Card from '../../ui/Card';
import classes from './CategoryAdd.module.css';
import { useDispatch, } from 'react-redux';
import { addCategory } from '../../redux/categorySlice';
import { axiosPrivate } from '../../api/axios';

const CategoryAdd = () => {
  const nameInputRef = useRef();
  const dispatch = useDispatch();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;

    const response = await axiosPrivate.post('/Categories', { name: enteredName, parentCategoryId: null });
    dispatch(addCategory({ name: enteredName, parentCategoryId: null }));
    }

    return (
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='name'>Category name</label>
            <input type='text' id='name' ref={nameInputRef} />
          </div>
          <div className={classes.actions}>
            <button className='btn'>Add Category</button>
          </div>
        </form>
      </Card>
    );
  };

  export default CategoryAdd;
