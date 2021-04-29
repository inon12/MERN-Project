import { Button } from '@material-ui/core'
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import axios from 'axios';



const validationSchema = yup.object(
    {
        userName : yup.string('Enter movie name')
        .required("email is required!"),
        password : yup.string('Enter password')
        .required("Genres is required!")
    }
)


function Login(props) {
    const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        let flag=false;
        let result= await axios.get("http://localhost:8000/api/users/")
        let res2 = result.data.filter(x=>x.username === values.userName)
        res2.forEach(element => {
            if (element.password === values.password)
                {
                    window.sessionStorage.setItem("fullname", element.fullname);
                    flag=true
                }
        });
         if (flag)
         {
            props.setToken(true)
         }
      
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="userName"
          name="userName"
          label="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button color="primary" variant="contained"  type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};


export default Login