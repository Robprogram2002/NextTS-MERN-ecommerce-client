/* eslint-disable no-loop-func */
import { FormEvent } from 'react';
import Resizer from 'react-image-file-resizer';
import { Avatar, Badge } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux_hooks';
import { removeImage, uploadImage } from '../../store/images_actions';

const FileUpload = () => {
  const dispatch = useAppDispatch();
  const { imagesUploaded } = useAppSelector((state) => state.productState);
  const { loading } = useAppSelector((state) => state.appState);

  const fileUploadAndResize = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as typeof e.target & {
      files: any[];
    };
    const { files } = target;

    if (files) {
      for (let i = 0; i < files.length; i += 1) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            dispatch(uploadImage(uri));
          },
          'base64'
        );
      }
    }
  };

  const handleImageRemove = (publicId: string) => {
    dispatch(removeImage(publicId));
  };

  return (
    <>
      <div className="row">
        {imagesUploaded &&
          imagesUploaded.map((image: any) => (
            <button
              type="button"
              onClick={() => handleImageRemove(image.public_id)}
              key={image.public_id}
            >
              <Badge count="X" style={{ cursor: 'pointer' }}>
                <Avatar
                  src={image.url}
                  size={100}
                  shape="square"
                  className="ml-3"
                />
              </Badge>
            </button>
          ))}
        {loading && <LoadingOutlined />}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
