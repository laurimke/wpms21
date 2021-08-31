import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {format} from 'date-fns';

const Single = ({route}) => {
  const {params} = route;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{params.title}</Text>
      <Image
        style={{width: 200, height: 200}}
        source={{uri: uploadsUrl + params.filename}}
      />
      <Text>{params.description}</Text>
      <Text>{params.user_id}</Text>
      <Text>{format(new Date(params.time_added), 'EEEE dd MMMM yyyy')}</Text>
      <Text>{params.media_type}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
