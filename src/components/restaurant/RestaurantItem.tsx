import { Component } from 'react';
import styled from 'styled-components';
import asian from '../../asset/category-asian.png';
import chinese from '../../asset/category-chinese.png';
import korean from '../../asset/category-korean.png';
import japanese from '../../asset/category-japanese.png';
import western from '../../asset/category-western.png';
import etc from '../../asset/category-etc.png';
import { Restaurant } from '../../App';
import { CATEGORIES } from './RestaurantList';

const SRestaurant = styled.li`
  display: flex;
  align-items: flex-start;

  padding: 16px 8px;

  border-bottom: 1px solid ${({ theme }) => theme.color.divideColor};

  cursor: pointer;
`;

const CategoryIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;

  margin-right: 16px;

  border-radius: 50%;
  background: ${({ theme }) => theme.color.lightenColor};
  img {
    width: 36px;
    height: 36px;
  }
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
`;

const RestaurantName = styled.h3`
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
`;

const RestaurantDistance = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.primaryColor};
`;

const RestaurantDescription = styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  display: -webkit-box;

  padding-top: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const categoryIcon: Record<(typeof CATEGORIES)[keyof typeof CATEGORIES], string> = {
  한식: korean,
  중식: chinese,
  일식: japanese,
  양식: western,
  아시안: asian,
  기타: etc,
};

export type Props = {
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES];
  name: string;
  distanceByMinutes: number;
  description: string;
  referenceUrl: string;
  setModalRestaurant: (restaurant: Restaurant) => void;
};

class RestaurantItem extends Component<Props> {
  onClickRestaurant = () => {
    this.props.setModalRestaurant({
      category: this.props.category,
      name: this.props.name,
      distanceByMinutes: this.props.distanceByMinutes,
      description: this.props.description,
      referenceUrl: this.props.referenceUrl,
    });
  };

  render() {
    return (
      <SRestaurant onClick={this.onClickRestaurant}>
        <CategoryIcon>
          <img src={categoryIcon[this.props.category]} alt={this.props.category} />
        </CategoryIcon>
        <RestaurantInfo>
          <RestaurantName>{this.props.name}</RestaurantName>
          <RestaurantDistance>캠퍼스부터 {this.props.distanceByMinutes}분 내</RestaurantDistance>
          <RestaurantDescription>{this.props.description}</RestaurantDescription>
        </RestaurantInfo>
      </SRestaurant>
    );
  }
}

export default RestaurantItem;
