import { useQuery } from "@tanstack/react-query";
import { Loader } from "semantic-ui-react";
import { fetchUpcomingMovies } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { DisplayType } from "../home";
import { Navigate } from "react-router-dom";

export const Upcoming = () => {
    
    const { data: upcomingMovieData, isLoading: isLoadingUpcomingMovies } = useQuery({
        queryKey: ["movies"],
        queryFn: fetchUpcomingMovies,
      });

    if (localStorage.getItem("guest_session_id") === null) {
      return <Navigate to="/auth" />;
    }
    
    if (isLoadingUpcomingMovies ) {
        return <Loader active />;
    }
    return (
        <div style={{ marginTop: 50, height: "auto" }}>
          <title>Upcoming Movies</title>
          <div>
          <ColumnDisplay
              data={upcomingMovieData.results}
              displayType={DisplayType.Movies}
            />
          </div>
        </div>
      );
} 