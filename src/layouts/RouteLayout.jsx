import { Outlet, useNavigation } from "react-router-dom";
import { ContentErrorBoundary } from "./error-boundaries/ContentErrorBoundary";


export function RouteLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading"

  return (
    <>
    <div className={isLoading ? "loading-spinner" : undefined}></div>
      <div id="wrapper" className={isLoading ? "loading" : undefined}>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid py-2 px-5">
              <ContentErrorBoundary>
                <Outlet />
              </ContentErrorBoundary>
            </div>
            <footer className="bg-primary text-light text-center p-3">Copyright © Brian Cheng 2024; For Demosration Purposes Only</footer>
          </div>
        </div>        
      </div>
    </>
  );
}
