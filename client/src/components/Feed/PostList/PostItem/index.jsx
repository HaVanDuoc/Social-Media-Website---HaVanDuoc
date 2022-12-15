import axios from 'axios';
import { format } from 'timeago.js';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import './PostItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectorCurrentUser } from '../../../../redux/reducers/AuthReducer';
import { useState } from 'react';

const PostItem = ({ post }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = useSelector(selectorCurrentUser);
    const dispatch = useDispatch();
    const [isFollow, setFollow] = useState(post.isFollow);

    const PostHeader = () => {
        const handleClickFollow = async () => {
            if (!currentUser) {
                dispatch({ type: 'OPEN_MODAL_LOGIN' });
                return;
            }

            const token = localStorage.getItem('token');

            const option = {
                method: 'put',
                url: `/user/${post.author.username}/follow`,
                data: { currentUsername: currentUser.user.username },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios(option);
            setFollow(!isFollow);
        };

        const ButtonFollow = () => {
            return (
                <div className="post__following" onClick={handleClickFollow}>
                    Theo Dõi
                </div>
            );
        };

        return (
            <div className="post__header">
                <Link to={'/profile/' + post.username}>
                    <div className="post__poster">
                        <Box display="flex" justifyContent="center" alignContent="center">
                            <Avatar
                                src={post ? PF + post.avatar : PF + 'images/noUser.png'}
                                sx={{ width: 40, height: 40 }}
                            />
                        </Box>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                margin: '0 10px',
                            }}
                        >
                            <div className="post__username">{post.username}</div>
                            <div className="post__date">{format(post.createdAt)}</div>
                        </div>
                    </div>
                </Link>
                {post.isFollow ? <React.Fragment /> : <ButtonFollow />}
            </div>
        );
    };

    const PostBody = () => (
        <div className="post__body">
            <div className="post__title">{post.title}</div>
            <div className="post__content">
                <div>{post.desc}</div>
                <div>
                    <img src={PF + post.img} alt="" />
                </div>
            </div>
            <div className="post__topic">{post.tag}</div>
        </div>
    );

    return (
        <div className="hvdPosts">
            <div className="postWrapper">
                <div id="post">
                    <PostHeader />
                    <PostBody />
                    {/* <PostFooter post={post} /> */}
                </div>
            </div>
        </div>
    );
};

export default PostItem;
