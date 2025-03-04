import { Form } from 'react-router-dom';
import { SubmitButton } from '../components';

const DemoUserLogin = () => {
  return (
    <Form method='post' className='mt-2'>
      <input
        type='text'
        hidden={true}
        defaultValue='demo@example.com'
        name='identifier'
      />
      <input
        type='password'
        hidden={true}
        defaultValue='secret'
        name='password'
      />
      <SubmitButton text='demo user' color='btn-secondary' />
    </Form>
  );
};
export default DemoUserLogin;
