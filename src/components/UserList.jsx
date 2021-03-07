import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import postService from '../services/posts';

const UserList = () => {
  const users = useSelector((state) => state.allUsers);
  const [dataLoaded, setDataLoaded] = useState(null);
  useEffect(() => {
    postService.getBestPosts()
      .then((bestPosts) => {
        console.log(bestPosts);
        setDataLoaded(bestPosts);
      });
  }, []);

  return (
    <div>
      <h2 className="text-center font-bold text-2xl my-3">
        Users in blog
      </h2>
      <div className="md:grid md:grid-cols-5">
        <div className="shadow rounded border md:col-start-2 md:col-span-3">
          <table className="divide-y min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Users</th>
                <th className="p-3">Posts</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-gray-100 rounded">
              {users.map((user) => (
                <tr className="divide-y hover:bg-white" key={user.id}>
                  <td className="text-center"><Link to={`/users/${user.username}`} className="hover:text-gray-500">{user.username}</Link></td>
                  <td className="text-center">{user.posts.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="text-center font-bold text-2xl my-3">
        Data about posts and users
      </h2>
      {
        dataLoaded
          ? (
            <div className="md:grid md:grid-cols-5">
              <div className="shadow rounded border md:col-start-2 md:col-span-3 mb-5">
                <table className="divide-y min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3" colSpan="2">Best posts and users</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y bg-gray-100 rounded">
                    <tr>
                      <td className="text-center font-semibold" colSpan="2">
                        Most liked
                        {' '}
                        <strong>post</strong>
                      </td>
                    </tr>
                    <tr className="divide-y hover:bg-white">
                      <td className="text-center">
                        <Link to={`/blog/${dataLoaded.mostLikedPost.url}`} className="hover:text-gray-500">
                          {dataLoaded.mostLikedPost.title}
                          , likes:
                          {' '}
                          {dataLoaded.mostLikedPost.likes}
                        </Link>
                      </td>
                      <td className="text-center">
                        author:
                        {' '}
                        {dataLoaded.mostLikedPost.author.username}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center font-semibold" colSpan="2">
                        Most liked
                        {' '}
                        <strong>author</strong>
                      </td>
                    </tr>
                    <tr className="divide-y hover:bg-white">
                      <td className="text-center">
                        {dataLoaded.mostLikedAuthor.username}
                      </td>
                      <td className="text-center">
                        Likes:
                        {' '}
                        {dataLoaded.mostLikedAuthor.likes}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center font-semibold" colSpan="2">
                        Author with most posts
                      </td>
                    </tr>
                    <tr className="divide-y hover:bg-white">
                      <td className="text-center">
                        {dataLoaded.mostPostsAuthor.username}
                      </td>
                      <td className="text-center">
                        Posts:
                        {' '}
                        {dataLoaded.mostPostsAuthor.posts}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center font-semibold" colSpan="2">
                        Total likes from posts -
                        {' '}
                        {dataLoaded.totalLikes}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
          : <div className="text-center">Loading...</div>
      }
    </div>
  );
};

export default UserList;
