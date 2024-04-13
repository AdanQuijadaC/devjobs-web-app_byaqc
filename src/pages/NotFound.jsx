import { useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();
  return (
    <>
      <div>no found</div>
    </>
  );
}
export default NotFound;
