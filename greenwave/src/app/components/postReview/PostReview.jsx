import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { GlobalUser } from '../users/globalUsers';
import * as Yup from 'yup';
import Filter from 'bad-words';

function ReviewForm({ productId }) {
  const { user } = useContext(GlobalUser);
  const [rating, setRating] = useState(0);
  const filter = new Filter();

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (values) => {
    const reviewData = {
      id: user.id,
      rating: rating,
      comment: filter.clean(values.comment),
    };

    try {
      const response = await axios.post(`https://greenwave-back.up.railway.app/${productId}`, reviewData);
      if (response.status === 201) {
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
      .max(300, 'El comentario es muy largo - no debe tener más de 300 caracteres.'),
  });

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <label>
            Rating:
            <StarRatings
              rating={rating}
              starRatedColor="yellow"
              changeRating={changeRating}
              numberOfStars={5}
              name='rating'
            />
          </label>
          <label>
            Comentario:
            <Field type="text" name="comment" />
            {errors.comment && touched.comment ? (
              <div>{errors.comment}</div>
            ) : null}
          </label>
          <button type="submit">Enviar revisión</button>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewForm;
