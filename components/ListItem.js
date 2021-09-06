import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {ListItem as ECListItem} from 'react-native-elements';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {Button} from 'react-native-elements/dist/buttons/Button';

const ListItem = ({singleMedia, navigation}) => {
  console.log('singleMedia', singleMedia);
  return (
    <View>
      {
        <ECListItem>
          <Avatar
            source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
            size="large"
            PlaceholderContent={<ActivityIndicator />}
          />
          <ECListItem.Content>
            <ECListItem.Title>{singleMedia.title}</ECListItem.Title>
            <ECListItem.Subtitle>{singleMedia.description}</ECListItem.Subtitle>
          </ECListItem.Content>
          <Button
            raised
            title="View"
            onPress={() => {
              navigation.navigate('Single', singleMedia);
            }}
          ></Button>
        </ECListItem>
      }
    </View>

    /*
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          navigation.navigate('Single', singleMedia);
        }}
      >
        <View style={styles.imagebox}>
          <Image
            style={styles.image}
            source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
          />
        </View>
        <View style={styles.textbox}>
          <Text style={styles.listTitle}>{singleMedia.title}</Text>
          <Text>{singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
      */
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
