import useForm from '../Hooks/useForm';
import * as Yup from 'yup';

const UncontrolledForm = () => {
  const handleFormSubmit = (values) => {
    console.log('UncontrolledForm Submited:', values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('نام را وارد کنید'),
    family: Yup.string().required('نام خانوادگی را وارد کنید'),
    national_number: Yup.string()
      .required('کد ملی را وارد کنید')
      .test('isNumber', 'کدملی معتبر نیست', (value) => /^[0-9]{10}$/.test(value)),
    nationality: Yup.boolean().required('ملیت را وارد کنید'),
  });

  const {
    errors,
    touched,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm(null, validationSchema, handleFormSubmit);

  return (
    <section className='form-section container'>
        <div className='form-section__header'>Uncontrolled</div>
        <form onSubmit={handleSubmit} className='form'>
            <div className='form__field'>
            <label>نام</label>
            <input
                type="text"
                name="name"
                onBlur={handleBlur}
            />
            {touched.name && errors.name && <div className='form__error-msg' >{errors.name}</div>}
            </div>
            <div className='form__field'>
            <label>نام خانوادگی</label>
            <input
                type="text"
                name="family"
                onBlur={handleBlur}
            />
            {touched.family && errors.family && <div className='form__error-msg' >{errors.family}</div>}
            </div>
            <div className='form__field'>
            <label>کدملی</label>
            <input
                type="text"
                name="national_number"
                onBlur={handleBlur}
            />
            {touched.national_number && errors.national_number && <div className='form__error-msg'>{errors.national_number}</div>}
            </div>
            <div className='form__field'>
            <label>ملیت</label>
            <select 
                name="nationality"
                onBlur={handleBlur}
            >
                <option value="true">ایرانی</option>
                <option value="false">غیرایرانی</option>
            </select>
            {touched.nationality && errors.nationality && <div className='form__error-msg'>{errors.nationality}</div>}
            </div>
            <button type="submit" disabled={isSubmitting} className='form__btn'>
            ثبت
            </button>
        </form>
    </section>
  );
};

export default UncontrolledForm;