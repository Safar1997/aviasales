/* eslint-disable react/prop-types */
import React from 'react';
import { TopSelector, BtnSelector } from '../style/form/checkBox';

const SortType = ({ updateSortType, sortType }) => {
  const { cheap, fast } = sortType;
  return (
    <TopSelector>
      <BtnSelector
        style={{ color: `${(cheap ? 'white' : ' #4A4A4A')}`, backgroundColor: (cheap ? '#2196F3' : 'white') }}
        onClick={() => { updateSortType({ cheap: true, fast: false }); }}
      >
        Самый дешевый
      </BtnSelector>
      <BtnSelector
        style={{ color: `${(fast ? 'white' : ' #4A4A4A')}`, backgroundColor: (fast ? '#2196F3' : 'white') }}
        onClick={() => { updateSortType({ cheap: false, fast: true }); }}
      >
        Самый быстрый
      </BtnSelector>
    </TopSelector>
  );
};


export default SortType;
