import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import ListItem from './ListItem';

const List = (props) => {
  const {mediaArray} = useMedia();
  console.log('List:mediaArray', mediaArray);
  return (
    <FlatList
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {};

export default List;
