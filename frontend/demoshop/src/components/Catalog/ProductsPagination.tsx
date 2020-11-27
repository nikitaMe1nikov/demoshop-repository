import React, { FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { HEIGHT } from './ProductCard';
import { CatalogStore } from '@frontend/catalog-store';
import { useWindowScrollPageCount } from 'hooks/scroll';

const PAGE_HEIGHT = HEIGHT * 10;

const CustomPagination = withStyles({
  root: {
    position: 'absolute',
    top: 146,
    right: 'calc(50% - 512px)',
  },
  ul: {
    'flex-direction': 'column',
    '& li': {
      margin: 6,
    },
    '& li:first-child': {
      transform: 'rotate(90deg)',
    },
    '& li:last-child': {
      transform: 'rotate(90deg)',
    },
  },
})(Pagination);

interface ProductsPaginationProps {
  className?: string;
}

export const ProductsPagination: FC<ProductsPaginationProps> = ({ className }) => {
  const { pageCount, currentPage, setCurrentPage } = useStore(CatalogStore);

  useWindowScrollPageCount(setCurrentPage, PAGE_HEIGHT);

  const onChangePagination = useCallback((e: any, page: number) => {
    window.scrollTo({ top: page - 1 && PAGE_HEIGHT * (page - 1) + 72, behavior: 'smooth' });
  }, []);

  return (
    <CustomPagination
      className={className}
      count={pageCount}
      page={currentPage}
      variant="outlined"
      color="primary"
      onChange={onChangePagination}
    />
  );
};

export default observer(ProductsPagination);
