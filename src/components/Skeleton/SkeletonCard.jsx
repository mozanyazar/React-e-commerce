import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SkeletonCard({ cards }) {
  return (
    <SkeletonTheme baseColor="#3333" highlightColor="#ededed">
      {Array(cards)
        .fill(0)
        .map((item, i) => {
          return (
            <div
              key={i}
              style={{
                width: "240px",
                height: "279px",
                border: "3px solid #3333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div style={{ height: "100px", width: "90%" }}>
                <Skeleton height={"100%"} />
              </div>
              <div style={{ width: "90%", height: "10px" }}>
                <Skeleton />
              </div>
              <div style={{ width: "50%", height: "10px" }}>
                <Skeleton />
              </div>
            </div>
          );
        })}
    </SkeletonTheme>
  );
}

export default SkeletonCard;
