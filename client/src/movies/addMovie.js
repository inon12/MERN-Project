import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import movieUtils from './movieUtils'
import {useHistory,Link} from 'react-router-dom'



const validationSchema = yup.object(
    {
        name : yup.string('Enter movie name')
        .required("name is required!"),
        genres : yup.string('Enter movie Genres')
        .required("Genres is required!"),
        image : yup.string('Enter movie image')
        .required("image is required!"),
        premiered : yup.string('Enter movie premiered')
        .required("premiered is required!")
    }
)


function AddMovie() {
  let history = useHistory()
  const formik = useFormik({
    initialValues: {
      name: '',
      genres: '',
      image: '',
      premiered: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        values.genres=values.genres.split(",")
        await movieUtils.postMovie(values)
        history.push('/movies/all')
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="genres"
          name="genres"
          label="genres"
          value={formik.values.genres}
          onChange={formik.handleChange}
          error={formik.touched.genres && Boolean(formik.errors.genres)}
          helperText={formik.touched.genres && formik.errors.genres}
        />
        <TextField
          fullWidth
          id="image"
          name="image"
          label="image url"
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />
        <TextField
          fullWidth
          id="premiered"
          name="premiered"
          label="year premiered"
          value={formik.values.premiered}
          onChange={formik.handleChange}
          error={formik.touched.premiered && Boolean(formik.errors.premiered)}
          helperText={formik.touched.premiered && formik.errors.premiered}
        />
        <Button color="primary" variant="contained"  type="submit">
          Save
        </Button>
        <Link to='/movies/all'>
        <Button color="primary" variant="contained"  type="button">
          Cancel
        </Button>
        </Link>
      </form>
    </div>
  );
};

export default  AddMovie;