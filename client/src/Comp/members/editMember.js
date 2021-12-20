import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import membersUtils from './membersUtils'
import {
  useHistory,
  Link,
  useParams,
} from "react-router-dom";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const validationSchema = yup.object(
    {
      fullname : yup.string('Enter member name')
        .required("name is required!"),
        email : yup.string('Enter member email')
        .required("email is required!"),
        city : yup.string('Enter member city')
        .required("city is required!")
    }
)


function EditMember() {
  let history = useHistory();
  let { id } = useParams();
  const [editMember,setEditMember]= useState([])

  useEffect(()=>
  {
      async function fetchData() {
        let result=await membersUtils.getMember(id)
        setEditMember(result.data) 
      }
      fetchData();
  },[])





  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: editMember.fullname || '',
      email:  editMember.email || '',
      city:  editMember.city || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        console.log(values)
        await membersUtils.putMembers(id,values)
        history.push('/members/all')
    }
  });

  return (



    <Grid container spacing={2} alignItems="center"
    justifyContent="center">
               <Grid item xs={4}>
                    <Item>
                        <form onSubmit={formik.handleSubmit}>
                          <TextField
                            fullWidth
                            id="fullname"
                            name="fullname"
                            label="Full name"
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                            helperText={formik.touched.fullname && formik.errors.fullname}
                          />
                          <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                          />
                          <TextField
                            fullWidth
                            id="city"
                            name="city"
                            label="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                          />
                        
                          <Button color="primary" variant="contained"  type="submit"style={{margin : "5px"}}  >
                            Update
                          </Button>
                          <Link to='/members/all'>
                          <Button color="primary" variant="contained"  type="button">
                            Cancel
                          </Button>
                          </Link>
                        </form>
                         </Item>
                  </Grid>
                </Grid>
  );
};

export default  EditMember;