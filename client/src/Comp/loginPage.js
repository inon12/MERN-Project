import { Button } from '@material-ui/core'
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import{Link} from 'react-router-dom'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const validationSchema = yup.object(
    {
        userName : yup.string('Enter movie name')
        .required("userName is required!"),
        password : yup.string('Enter password')
        .required("password is required!")
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
        await axios.post("http://localhost:8000/api/login/",{
          username : values.userName,
          password : values.password
        }).then(response => 
          {
            if (!response.data.auth)
            {
               props.setToken(false)
            }
            else
            { 
              localStorage.setItem("fullname",response.data.user.fullname)
              localStorage.setItem("token",response.data.token);
              props.setToken(true)
            }
          }
      
        )
      }
  });

  return (



    <Grid container spacing={2}  alignItems="center"
    justifyContent="center">
               <Grid item xs={4}>
          <h2>Wellcom back</h2>
          <Item>
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
                    type="password"
                    id="password"
                    name="password"
                    label="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                  <Button color="primary" variant="contained"  type="submit">
                    Login
                  </Button>
              </form>
            </Item>
        </Grid>
    </Grid>         
 
  );
};


export default Login