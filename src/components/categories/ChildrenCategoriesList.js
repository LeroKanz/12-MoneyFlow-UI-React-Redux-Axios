import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Category from './Category';
import classes from './CategoriesList.module.css';
import { useParams } from "react-router-dom";

const ChildrenCategoriesList = () => {
  const categories = useSelector(state => state.forCategories.categories);
  const { id } = useParams();
  
  return (
    <Fragment>
      <ul className={classes.list}>
        {categories.map((category) => (category.parentCategoryId == id &&
          <Category
            key={category.id}
            {...category}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default ChildrenCategoriesList;
