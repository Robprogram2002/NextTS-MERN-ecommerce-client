import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadImage = createAsyncThunk(
  'image/upload',
  async (uri: string | Blob | File | ProgressEvent<FileReader>) => {
    try {
      const response = await axios.post('/images/upload', {
        image: uri,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        newFile: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const removeImage = createAsyncThunk(
  'image/remove',
  async (publicId: string) => {
    try {
      const response = await axios.post('/images/remove', { publicId });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        message: response.data.messgae,
        publicId,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
