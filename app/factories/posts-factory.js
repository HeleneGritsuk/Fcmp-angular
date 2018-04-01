const api = 'http://localhost:3000/blogs/';

export default $resource => {
  let posts = $resource(api).query();

  return {
    getPosts() {
      return posts;
    },

    getPost(id) {
      return $resource(api + id).get();
    },

    addPost(post) {
      $resource(api).save(JSON.stringify(post), post => {
        posts.push(post);
      });
    },

    removePost(id) {
      return $resource(api + id)
        .delete()
        .$promise.then(
          () => (posts = posts.filter(post => post._id !== id)),
          error => console.log(error),
        );
    },

    editPost(post) {
      return $resource(api + post._id, null, {
        update: { method: 'PUT' },
      })
        .update(JSON.stringify(post))
        .$promise.then(
          () => console.log('update'),
          error => console.log(error),
        );
    },
  };
};
