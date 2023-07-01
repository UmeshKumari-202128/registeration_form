import React from 'react';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, RadioGroup, FormControlLabel, Radio, FormControl, Select, Checkbox, ListItemText, Button, colors } from '@material-ui/core';


// Country options 

const countries = [
  { value: 'usa', label: 'USA' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'UK' },
  // Add more countries as needed
];


// Hobbies options 

const hobbies = [
  'Reading',
  'Writing',
  'Painting',
  'Gaming',
  'Sports',
  // Add more hobbies as needed
];

// Validations for all fields

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').matches(/^[A-Za-z]{3,}$/, 'Name must contain at least 3 alphabetic characters'),
    address: Yup.string().required('Address is required').min(5, 'Address must be at least 5 characters'),
    country: Yup.string().required('Country is required'),
    gender: Yup.string().required('Gender is required'),
    interests: Yup.array().min(1, 'Select at least one hobby').required('Hobbies are required'),
});

 
// Initial values of each field is set to blank

const initialValues = {
  name: '',
  address: '',
  country: '',
  gender: '',
  interests: [],
};


// Form Component  

const UserForm = () => {

  const handleSubmit = (values,{ resetForm }) => {
    console.log(values);                            //  on submitting values should be shown in console
    resetForm({ values: initialValues });           // after submitting form again set to initial state
  };

  return (

    <div className="MaterialForm">

        <h1 id='heading'> User Registeration Form </h1>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
      {({ values, handleChange, errors, touched }) => (

        
        <Form>
          

           {/* Name Field  */}
           
          <label htmlFor="Name">Name</label>
          <Field name="name" as={TextField} error={touched.name && Boolean(errors.name)} helperText={<ErrorMessage name="name" component="div" className="error-message" />} />

          <br/>
          

          {/* Address Field */}

          <label htmlFor="Address">Address</label>
          <Field name="address" as={TextField}  multiline minRows={4} error={touched.address && Boolean(errors.address)} helperText={<ErrorMessage name="address" component="div" className="error-message" />} />

          <br/>
     
           {/* Country Field */}

          <label htmlFor="Country">Country</label>
          <FormControl fullWidth error={touched.country && Boolean(errors.country)}>
            <Field name="country" as={Select}>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage name="country" component="div" className="error-message"/>
          </FormControl>

          <br/>
        
          {/* Gender Field */}

          <label htmlFor="Gender"> Gender</label>
          <FormControl component="fieldset" error={touched.gender && Boolean(errors.gender)}>
            <Field name="gender">
              {({ field }) => (
                <RadioGroup
                  name="gender"
                  value={field.value}
                  onChange={handleChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              )}
            </Field>
            <ErrorMessage name="gender" component="div" className="error-message" />
          </FormControl>

          <br/>

          {/* Hobbies Field */}

          <label htmlFor="Hobbies">Hobbies</label>
          <FormControl fullWidth error={touched.interests && Boolean(errors.interests)}>
            
            <Field name="interests">
              {({ field }) => (
                <Select
                  multiple
                  value={field.value}
                  onChange={handleChange}
                  inputProps={{ id: 'interests', name: 'interests' }}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {hobbies.map((hobby) => (
                    <MenuItem key={hobby} value={hobby}>
                      <Checkbox checked={field.value.includes(hobby)} />
                      <ListItemText primary={hobby} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Field>
            <ErrorMessage name="interests" component="div" className="error-message"/>
          </FormControl>


          <br/>

          {/* Submit button */}

          <Button type="submit" variant="contained" color="primary" >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default UserForm;
