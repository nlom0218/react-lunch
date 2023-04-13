import { Component } from 'react';
import styled from 'styled-components';
import SelectBox from '../common/SelectBox';
import mockData from '../../mockData.json';
import RestaurantItem from './RestaurantItem';
import { Restaurant } from '../../App';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';

const RestaurantListLayout = styled.main`
  padding: 16px;
`;

const SelectBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Restaurants = styled.ul`
  display: flex;
  flex-direction: column;

  margin: 16px 0;
`;

export const CATEGORIES = {
  KOREAN: '한식',
  CHINESE: '중식',
  JAPANESE: '일식',
  WESTERN: '양식',
  ASIAN: '아시안',
  ETC: '기타',
} as const;

const SORT_OPTIONS = {
  NAME: '이름순',
  DISTANCE: '거리순',
};

type Props = {
  setModalRestaurant: (restaurant: Restaurant) => void;
};

type State = {
  restaurantList: Restaurant[];
  filterOption: string;
  sortOption: string;
};

const filterFn = (restaurants: Restaurant[], category: string) => {
  if (category === '전체') return restaurants;
  return restaurants.filter((restaurant) => restaurant.category === category);
};

const sortFn = (restaurants: Restaurant[], type: string): Restaurant[] => {
  if (type === '이름순') return restaurants.sort((a, b) => (a.name > b.name ? 1 : -1));
  return restaurants.sort((a, b) => (a.distanceByMinutes > b.distanceByMinutes ? 1 : -1));
};

class RestaurantList extends Component<Props, State> {
  state = {
    restaurantList: mockData as Restaurant[],
    filterOption: '전체',
    sortOption: '이름순',
  };

  componentDidMount() {
    const savedRestaurants = getLocalStorage('restaurants');

    if (savedRestaurants) {
      this.setState({
        restaurantList: savedRestaurants,
      });
    } else setLocalStorage('restaurants', this.state.restaurantList);
  }

  filterAndSort = () => {
    return sortFn(filterFn(this.state.restaurantList, this.state.filterOption), this.state.sortOption);
  };

  // fn = (Option) => {
  //   this.setState({
  //     filterOption: '일식',
  //   });
  //   this.setState({
  //     filter: () => {
  //       filterFn(this.state.restaurantList, Option);
  //     },
  //   });
  // };

  setFilterOption = (option: string) => {
    this.setState({
      filterOption: option,
    });
  };

  setSortOption = (option: string) => {
    this.setState({
      sortOption: option,
    });
  };

  render() {
    return (
      <RestaurantListLayout>
        <SelectBoxContainer>
          <SelectBox options={Object.values(CATEGORIES)} setOption={this.setFilterOption} />
          <SelectBox options={Object.values(SORT_OPTIONS)} setOption={this.setSortOption} />
        </SelectBoxContainer>
        <Restaurants>
          {this.filterAndSort().map((restaurant, index) => (
            <RestaurantItem key={index} {...restaurant} setModalRestaurant={this.props.setModalRestaurant} />
          ))}
        </Restaurants>
      </RestaurantListLayout>
    );
  }
}

export default RestaurantList;
