import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  changeSortOrder,
  setFilterText,
  setSortByKey,
} from "../../redux/productsSlice";
import { productsSelector } from "../../redux/selectors";

const waitTime = 500;

const ProductsFilter = React.forwardRef(function ProductsFilter(_, ref) {
  const dispatch = useAppDispatch();
  const { sortByKey } = useAppSelector(productsSelector);

  let timer: ReturnType<typeof setTimeout>;

  const changeInputTitleHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;

    clearTimeout(timer);

    timer = setTimeout(() => {
      dispatch(setFilterText(target.value));
    }, waitTime);
  };

  const sortbyChangeHandler = (event: SelectChangeEvent) => {
    dispatch(setSortByKey(event.target.value));
  };

  const changeOrderHandler = () => {
    dispatch(changeSortOrder());
  };

  return (
    <Box ref={ref}>
      <Grid container spacing={2} sx={{ pb: 3 }}>
        <Grid item xs={8}>
          <TextField
            id="product-title-input"
            label="Filter by title"
            variant="standard"
            sx={{ width: "max(250px, 60%)" }}
            onKeyUp={changeInputTitleHandler}
          />
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <FormControl variant="standard" sx={{ minWidth: 80 }}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-select"
                value={sortByKey}
                onChange={sortbyChangeHandler}
                label="Sort by"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>

            <IconButton
              aria-label="Sort order"
              {...(sortByKey
                ? { onClick: changeOrderHandler }
                : { disabled: true })}
            >
              <SortByAlphaIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

export default ProductsFilter;
