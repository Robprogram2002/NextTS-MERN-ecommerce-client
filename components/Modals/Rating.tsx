import { FC, useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { StarOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks/redux_hooks';

const RatingModal: FC = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { authenticated } = useAppSelector((state) => state.userState);
  const router = useRouter();

  const handleModal = () => {
    if (authenticated) {
      setModalVisible(true);
    } else {
      router.push({
        pathname: '/login',
        query: { redirect: `/products/${router.query.slug!}` },
      });
    }
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onClick={handleModal} onKeyDown={handleModal}>
        <StarOutlined className="text-danger" /> <br />{' '}
        {authenticated ? 'Leave rating' : 'Login to leave rating'}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Thanks for your review. It will apper soon');
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
