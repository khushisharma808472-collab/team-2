import {
  useEffect,
  useState,
} from "react";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

import api from "../../services/api";

function SiteDelayTracker() {

  const [milestones, setMilestones] =
    useState([]);

  const [activeDelays, setActiveDelays] =
    useState(0);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const fetchDelayData =
      async () => {

        try {

          setLoading(true);

          const response =
            await api.get(
              "/admin/site-progress"
            );


          if (
            response.data.success
          ) {

            /*
            IMPORTANT:
            delayedMilestones sirf delayed
            items deta hai.

            Lekin screenshot jaisa
            full milestone tracker chahiye,
            isliye milestones use karenge.
            */

            setMilestones(
              response.data.milestones || []
            );

            setActiveDelays(
              response.data.stats
                ?.activeDelays || 0
            );

          }

        } catch (error) {

          console.error(
            "Failed to fetch delay tracker:",
            error.response?.data ||
              error.message
          );

        } finally {

          setLoading(false);

        }

      };


    fetchDelayData();

  }, []);


  const getMilestoneInfo =
    (milestone) => {

      const status =
        milestone.status
          ?.toLowerCase() || "";

      const progress =
        milestone.progress || 0;


      if (
        progress >= 100 ||
        status.includes("completed") ||
        status.includes("approved")
      ) {

        return {
          icon: CheckCircle2,
          badgeType: "good",
          statusText:
            milestone.status ||
            "Completed",
        };

      }


      if (
        status.includes("delay")
      ) {

        return {
          icon: AlertTriangle,
          badgeType: "warning",
          statusText:
            milestone.status,
        };

      }


      if (
        progress > 0
      ) {

        return {
          icon: Clock,
          badgeType: "progress",
          statusText:
            `${progress}% In Progress`,
        };

      }


      return {

        icon: Clock,

        badgeType: "pending",

        statusText:
          milestone.status ||
          "Scheduled",

      };

    };


  return (

    <div className="dashboard-card site-delay-card">

      <div className="card-header">

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >

          <AlertTriangle
            size={18}
            color="#ef4444"
          />

          <h3>
            Milestone & Delay Tracker
          </h3>

        </div>


        <span
          className="delay-alert-pill"
        >

          {activeDelays}
          {" "}
          Active Delays

        </span>

      </div>


      <div className="delay-list">

        {loading ? (

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
            }}
          >

            Loading milestones...

          </p>

        ) : milestones.length === 0 ? (

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
            }}
          >

            No milestones found.

          </p>

        ) : (

          milestones.map(
            (milestone, index) => {

              const info =
                getMilestoneInfo(
                  milestone
                );


              const Icon =
                info.icon;


              return (

                <div
                  className="delay-item"
                  key={
                    milestone._id
                  }
                >

                  <div
                    className={`delay-icon-box ${info.badgeType}`}
                  >

                    <Icon
                      size={16}
                    />

                  </div>


                  <div className="delay-details">

                    <strong>

                      Phase{" "}
                      {index + 1}:{" "}

                      {
                        milestone.phase
                      }

                    </strong>


                    <span>

                      Due Date:{" "}

                      {
                        milestone.date
                      }

                    </span>

                  </div>


                  <div className="delay-status-col">

                    <span
                      className={`status-pill ${info.badgeType}`}
                    >

                      {
                        info.statusText
                      }

                    </span>


                    <small>

                      {
                        milestone.progress ||
                        0
                      }
                      % Progress

                    </small>

                  </div>

                </div>

              );

            }
          )

        )}

      </div>

    </div>

  );

}

export default SiteDelayTracker;