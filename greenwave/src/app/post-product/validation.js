

const validatePost = (post) => {
    const errors = {};
    
    if (!post.name) {
      errors.name = 'Empty name';
    }else if(post.name.lenght <= 3){
        errors.name = 'Name must contain, 4-35 characters'
    }else if (post.name.length > 35) {
      errors.name = 'Name exceeds 35 characters';
    }
    
    if(!post.imgFile && !post.img){
      errors.image = 'must provided a Url or select valid file'
    }
    if (!post.description) {
      errors.description = 'Empty description';
    } else if (post.description.length < 20 || post.description.length > 500) {
      errors.description = 'Description length must contain 20-500 characters';
    }
    if (!post.price){
        errors.price = 'provide a price'
    }
  
    return errors;
  }
  
  export default validatePost;
  