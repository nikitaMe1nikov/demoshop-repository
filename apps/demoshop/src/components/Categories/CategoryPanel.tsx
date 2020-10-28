import React, { FC, memo } from 'react';
import { observer } from 'mobx-react-lite';
import { generatePath, convertColonToBracketParams } from '@nimel/directorr-next';
import { styled } from '@material-ui/core/styles';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStore } from '@nimel/directorr-react';
// import { CategoriesStore, Category } from '@demo/categories-store';
import { CATEGORY_URL } from '@demo/url';
import CategoryPanelStore, { Category } from './CategoryPanel.store';

const Container = styled(List)(({ theme }) => ({
  position: 'absolute',
  top: 77,
  left: 'calc(50% - 712px)',
  width: 240,
  color: theme.palette.text.primary,
}));

interface CategoryItemProps {
  category: Category;
  selected: boolean;
}

const CategoryItem: FC<CategoryItemProps> = memo(({ category, selected }) => (
  <Link
    href={convertColonToBracketParams(CATEGORY_URL)}
    as={generatePath(CATEGORY_URL, { categoryID: category.id })}
  >
    <ListItem button selected={selected}>
      <ListItemText primary={category.name} />
    </ListItem>
  </Link>
));

interface CategoryPanelProps {
  className?: string;
}

export const CategoryPanel: FC<CategoryPanelProps> = ({ className }) => {
  const { categories, currentCategoryID } = useStore(CategoryPanelStore);

  if (!categories) return null;

  return (
    <Container className={className}>
      {categories.map((c) => (
        <CategoryItem key={c.id} category={c} selected={currentCategoryID === c.id} />
      ))}
    </Container>
  );
};

export default observer(CategoryPanel);
