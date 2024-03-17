import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <p className="lead text-gray-800 mb-5">Page Not Found</p>
        <p className="text-gray-500 mb-0">
          The page you are looking for does not seem to exist...
        </p>
        <Link to="/dashboard">&larr; Back to Dashboard</Link>
      </div>
    </>
  );
}
