import { Outlet, useNavigation } from "react-router-dom";
import { SideBar } from "./sidebar-components/SideBar";
import { ContentErrorBoundary } from "./error-boundaries/ContentErrorBoundary";

export function RouteLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading"

  return (
    <>
    <div className={isLoading ? "loading-spinner" : undefined}></div>
      <div id="wrapper" className={isLoading ? "loading" : undefined}>
        {/* Sidebar */}
        <SideBar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid py-4">
              <ContentErrorBoundary>
                <Outlet />
              </ContentErrorBoundary>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
