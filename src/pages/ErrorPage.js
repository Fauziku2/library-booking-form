import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <main>
      <h1>An error occurred!</h1>
      <p>Could not find this page!</p>
      <p>
        Go to <Link to="/">booking page</Link>.
      </p>
    </main>
  );
};

export default ErrorPage;
