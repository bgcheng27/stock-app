export function DevErrorPage({ error, errorInfo }) {
  return (
    <>
      <h1>Something Went Wrong!</h1>
      <h3>{error && error.toString() }</h3>
      <pre className="text-danger">
        {errorInfo && errorInfo.componentStack}
      </pre>
    </>
  )
}