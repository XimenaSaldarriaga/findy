import React, { useEffect, useState } from 'react';
import './profile.scss';
import { useAuth } from '../authContext';
import { fetchPostData, fetchUserData } from '../../services/data';
import dots from '../../assets/dots.png';
import arrow from '../../assets/arrow.png';
import edit from '../../assets/edit.png';
import logout from '../../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import UpdateUsers from '../updateUser/UpdateUser';

const Profile = () => {
  const { state, dispatch } = useAuth();
  const userId = state.userId || localStorage.getItem('userId');
  const [currentUser, setCurrentUser] = useState(null);
  const [userPost, setUserPost] = useState([]);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
    
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserData(userId);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchPost = async () => {
      try {
        const postData = await fetchPostData(userId);
        setUserPost(postData);
        console.log("userPost inside useEffect:", postData);
            } catch (error) {
        console.log('Error obteniendo los post', error);
      }
    };

    fetchUser();
    fetchPost();
  }, [userId]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userId');
    navigate('/');
  };

  const goToHome = () => {
    if (userId) {
      navigate(`/home/${userId}`);
    }
  };
  return (
    <>
      {currentUser && (
        <div className='profile'>
          <img className='profile__image' src={currentUser.banner} alt={currentUser.username} />
          <img className='profile__dots' src={dots} alt="" onClick={() => setShowSidebar(!showSidebar)} />

          {showSidebar && !showUpdateForm && (
            <div className='profile__sidebar'>
              <button onClick={toggleUpdateForm}> <img className='profile__icons' src={edit} alt="" />Edit Profile</button>
              <button onClick={handleLogout}> <img className='profile__icons' src={logout} alt="" />Logout</button>
            </div>
          )}
          <img className='profile__arrow' src={arrow} alt="" onClick={goToHome} />
          <div className='profile__info'>
            <div className='profile__likes'>
              <div className='profile__option'>
                <p className='profile__subtitle'> {currentUser.followers} M </p>
                <p>Followers</p>
              </div>
              <img className='profile__input' src={currentUser.avatar} alt={currentUser.username} />
              <div className='profile__option'>
                <p className='profile__subtitle'>{userPost.likes} M</p>
                <p>Likes</p>
              </div>
            </div>

            <div className='profile__personal'>
              <p className='profile__subtitle'>{currentUser.name}</p>
              <div className='profile__about'>
                <p>{currentUser.status}</p>
              </div>
            </div>

            <div className='profile__buttons'>
              <button>Follow</button>
              <button>Messages</button>
            </div>
          </div>

          <div className='profile__posts'>
            <ul className='profile__options'>
              <li>Photos</li>
              <li>Videos</li>
              <li>Album</li>
              <li>Tag</li>
            </ul>
            <div className='profile__photos'>

              <div className='profile__photodiv'>
                <img className='profile__photo' src="https://s3-alpha-sig.figma.com/img/bc3b/dcc1/67006aac91c99ed7b37fb3d72d058ad9?Expires=1692576000&Signature=I93~crCohnjI1PWpDjilvjphsAutw44mgIunUHJZU5lOO937G5-lHJAP69OXIXzB4XoiINwx4VbnOpqD9Q5rRudlJX5jZlUsnui0pon0XaA6Q~fBKXJSn5sK1hh~hoIbLZT0zbMcLPMOBRUEayTn4~84AmfWGDvhXGWzAs0bewxUk2FxNanwoMaBdFs~volsC-X-Ny4qtIoF2QdyuxTrCihNop9S4xXENwzWhl6C0hlGKF5Oy6Pc8iY0wcVyPbVKrFUbJFnIvG~NnRWUlGVIT6o3iC0A169ii43CzpX-mNZXOHjiWvp7r8cTbGByvlf48KKPo1k1QACmgGijQ4c3ew__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />
              </div>

              <div className='profile__photodiv'><img className='profile__photo' src="https://s3-alpha-sig.figma.com/img/47a3/b386/305d6fd1514463f1edc8412d7ae7b45c?Expires=1692576000&Signature=QWrcXF2RFQ60PRsiEB0lObCRDm8sbd3WnVro5k-Ggm75zSbF2GcogxaAocFNXd4wjXnmzyDb~93r2oIc8HLDmABOD0IJ87xhx3rLW-P3yoRwG-muqNxK6-bmRYNDNLTqn7-5Ph96PkuBzfernypjN3S5ptSTqfd2o5IJUXyqUgVqiEhVkPz497HWX16UKZvJ53Xce9I9IAnitYvYonN6yzbH0AiLQdkwZBg~Fw0WB7U4NqgAzZDObJKL7zrxjv-R9o9wLkG4~nmbDo-TshCrnIPhfMvRY7JFJYaenETYfUfHq6KvX-nccQcLSLH7o5nMLYIYhn2sFpnAyGUsORHPng__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></div>

              <div className='profile__photodiv'><img className='profile__photo' src="https://s3-alpha-sig.figma.com/img/80d3/d616/68632c49988f908bc63533338e923678?Expires=1692576000&Signature=ZPpwgmaGQDVfNaXbASaEdVu5A2FPNGnB5AC-cS2eNvdqv1qyg-lCeYvuBgA01TVpKSo89UkKBC0TKE2TcpvZB5exxKf1UFHXbaiopp6tJoFTs3oH7iJ04~71097qSGaiMSwKFZK3CDdN6HQdvqL-qpt8cKIkcR4Sv0xZ0ZQJC~cwiHAuW8KBMDW53AC~m5D3C4gpSbYW04p5ODLfmIItn4T6nc39ajmIQ6VkjfwFgiNsHbeNLsouaHhekxLDDpKnnizJK3Y9XmGQROg6KDvDtkTF17Z-H41-mqYFqMkKX2WBsqeBp77V4ZkE28wkfjHJN4Mb0djlTM2teSWoTJoStg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></div>

              <div className='profile__photodiv'><img className='profile__photo' src="
          https://s3-alpha-sig.figma.com/img/e16a/f17a/4805fb0a220637377cce1952fd4f4a39?Expires=1692576000&Signature=Rptr~vpa89PlskoUq2GFt2fT7UTO59ettcTanaTrjAII1F0kAoTCg1lvJ~omr0ZZNPaqKsn4kiB2H1lLj763jCCL1j5lXlBOqtIhndkyn22TTAs2werGv1zspp60NTWD-gLuCg61ktevo7~oQOOf3k1CIfSSTI-EHp4cDUn8F-aLTML9pD5ythN0F6cyvACttG5xvQsmxKagvMk-EIqobdhm7wpQK5JmZ1jfBSrCoeAmM3H0vq8Ds7XhZrdf9C9bcTTKe8EDTsd~ymKDvh-hY7u~nQkfr6UjlcwHMnDIvdjUmwCgHG-kaKVhQOE5BGw1qcA6LGKfpB1y8n27TbCPug__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></div>

            </div>
          </div>
          {showUpdateForm && <UpdateUsers onClose={closeUpdateForm} />}
        </div>
      )}
    </>
  );
};

export default Profile;
