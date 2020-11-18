import React, { useCallback, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { CatalogStore } from '@demo/catalog-store';
import i18n from '@demo/i18n';

const useStyles = makeStyles((theme) => ({
  sortSelect: {
    minWidth: theme.spacing(18),
  },
}));

export const ProductsTitle: FC = () => {
  const classes = useStyles();
  const { currentCategory, productsTotal, sortList, currentSort, setCurrentSort } = useStore(
    CatalogStore
  );

  const selectedSort = useCallback(
    (e) => {
      setCurrentSort(e.target.value);
    },
    [setCurrentSort]
  );

  return (
    <Box
      my={2}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {!currentCategory ? (
        <Skeleton variant="text" height={56} width={150} />
      ) : (
        <>
          <Box display="flex" flexDirection="row">
            <Box mr={1}>
              <Typography variant="h4">{currentCategory.name}</Typography>
            </Box>
            <Typography variant="h4" color="textSecondary">
              {productsTotal}
            </Typography>
          </Box>
          <FormControl variant="outlined">
            <InputLabel id="catalog-select-sort">Сортировка</InputLabel>
            <Select
              className={classes.sortSelect}
              labelId="catalog-select-sort"
              value={currentSort}
              onChange={selectedSort}
              label="Сортировка"
            >
              {sortList.map((s) => (
                <MenuItem key={s} value={s}>
                  {i18n[s]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </Box>
  );
};

export default observer(ProductsTitle);
