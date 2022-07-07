import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Category from './Category';
import classes from './CategoriesList.module.css';

const CategoriesList = () => {
  const categories = useSelector(state => state.forCategories.categories);
  
  return (
    <Fragment>
      <ul className={classes.list}>
        {categories.map((category) => (!category.parentCategoryId &&
          <Category
            key={category.id}
            {...category}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default CategoriesList;
