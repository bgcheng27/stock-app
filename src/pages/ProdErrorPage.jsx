import { Link } from "react-router-dom";

export function ProdErrorPage({ statusCode, message }) {
  return (
    <>
      <div className="text-center">
        <div className="error mx-auto" data-text={statusCode}>
          {statusCode}
        </div>
        <p className="lead text-gray-800 mb-5">{message}</p>
        <p className="text-gray-500 mb-0">
          The page you are looking for does not seem to exist...
        </p>
        <Link to="/">&larr; Back to Dashboard</Link>
      </div>
    </>
  );
}
