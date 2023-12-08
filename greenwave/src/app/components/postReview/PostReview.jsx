import React, { useState, useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { GlobalUser } from '../users/globalUsers';
import * as Yup from 'yup';
import Filter from 'bad-words';
import Swal from "sweetalert2";
import '../../../../public/estilos/buycart.css'

function ReviewForm({ productId,  }) {
  const Backurl = process.env.BACK
  const { user } = useContext(GlobalUser);
  const [rating, setRating] = useState(0);
  const filter = new Filter();

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (values) => {
    const reviewData = {
      productId, 
      userId: user.id,
      rating: rating,
      comment: filter.clean(values.comment),
    };
    try {
      const response = await axios.post(`${Backurl}/review`, reviewData);
  
      if (response.status === 200) {
        return Swal.fire({
            icon: "Great",
            title: "Review",
            text: "Thanks for your Review",
          });
      } else {
        console.log('Error al crear la revisión');
      }
    } catch (error) {
      console.error('Error al hacer la petición POST:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
    .min(2, 'El comentario es muy corto - debe tener al menos 2 caracteres.')
      .max(300, 'El comentario es muy largo - no debe tener más de 300 caracteres.')
  });

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className='w-3/5 flex flex-col rounded justify-center items-start  max-w-lg mx-auto my-1 p-4' style={{backgroundColor:"ButtonFace"}}>
          <div className='mb-4 w-full'>
          <label className='font-semibold mb-2'>
            Rating:
            <StarRatings
              rating={rating}
              starRatedColor="green"
              changeRating={changeRating}
              numberOfStars={5}
              name='rating'
            />
          </label>
          </div>
          <div className='mb-4 w-full'></div>
          <label className='font-semibold mb-2'>
            Comentario:
            <Field type="textarea" name="comment" />
            {errors.comment && touched.comment ? (
              <div>{errors.comment}</div>
            ) : null}
          </label>
          <div className='mt-4'>
            <button type="submit" className='elemento' style={{height: "40px", backgroundColor:"ButtonFace"}}>Enviar revisión</button>
            </div>
        
        </Form>

      )}
    </Formik>
  );
}

export default ReviewForm;
