import { useState } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import emailValidator from 'email-validator'
import { FirebaseSignIn } from './firebaseAuth'

export default function SignIn({isError}) {
  const [hasError, setHasError] = useState(false)

  return (
    <>
      <h2>S'identifier</h2>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Veuillez saisir votre adresse e-mail.'
          } else if (!emailValidator.validate(values.email)) {
            errors.email = 'Veuillez mettez une adresse email valide.'
          }
          if (!values.password) {
            errors.password = 'Veuillez entrer un mot de passe.'
          } else if (values.password.length < 8) {
            errors.password = 'Veuillez saisir un minimum de 8 caractères.'
          }
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password } = values
          setHasError(false)
          try {
            //await firebase.auth().signInWithEmailAndPassword(email, password)
            FirebaseSignIn(isError, email, password)
            setSubmitting(false)

            if (location.state) {
              const { from } = location.state
              if (from) {
                history.push(from)
              }
            }
          } catch (err) {
            console.error(err.message)
            setHasError(true)
            setSubmitting(false)
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              Adresse e-mail:
              <Field type="email" name="email" />
              <ErrorMessage name="email" className="error" component="span" />
            </label>
            <br />
            <label>
              Mot de passe:
              <Field type="password" name="password" />
              <ErrorMessage name="password" className="error" component="span" />
            </label>
            <footer>
              <button type="submit" className="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Connectez-vous…' : 'S\'identifier'}
              </button>
            </footer>
            {hasError && (
              <p>
                <span className="error">Quelque chose s'est mal passé.</span>
              </p>
            )}
          </form>
        )}
      </Formik>
    </>
  )
}
