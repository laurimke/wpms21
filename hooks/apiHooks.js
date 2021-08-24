import {useEffect, useState} from 'react';
import {doFetch} from '../utils/http';
import {baseUrl} from '../utils/variables';

// TODO: add necessary imports
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, []);

  const loadMedia = async () => {
    try {
      const mediaIlmanThumbnailia = doFetch(baseUrl + 'media');
      const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
        return await loadSingeMedia(media.file_id);
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log('loadMedia', e.message);
    }
  };
  const loadSingeMedia = async (id) => {
    try {
      const tiedosto = await fetch(baseUrl + 'media/' + id);
      return tiedosto;
    } catch (e) {
      console.log('loadSIngleMedia', e.message());
      return {};
    }
  };
  return {mediaArray, loadMedia, loadSingeMedia};
};

export {useMedia};
