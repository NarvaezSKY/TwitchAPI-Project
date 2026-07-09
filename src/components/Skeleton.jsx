/* eslint-disable react/prop-types */
const Skeleton = ({ className = '', width, height, borderRadius = '0.75rem' }) => (
  <div
    className={`animate-pulse bg-[#27272a] ${className}`}
    style={{ width, height, borderRadius }}
    aria-hidden="true"
  />
);

export const GameCardSkeleton = () => (
  <div className="card-surface overflow-hidden" role="status" aria-label="Loading game card">
    <Skeleton width="100%" height="320px" borderRadius="0" />
    <div className="p-4 space-y-3">
      <Skeleton width="70%" height="1.25rem" />
      <Skeleton width="40%" height="0.875rem" />
    </div>
  </div>
);

export const StreamItemSkeleton = () => (
  <div className="flex items-center gap-3 px-3 py-2" role="status" aria-label="Loading stream">
    <Skeleton width="2.5rem" height="2.5rem" borderRadius="9999px" />
    <div className="flex-1 space-y-2">
      <Skeleton width="60%" height="0.875rem" />
      <Skeleton width="80%" height="0.75rem" />
    </div>
  </div>
);

export const SearchResultSkeleton = () => (
  <div className="card-surface overflow-hidden" role="status" aria-label="Loading search result">
    <div className="flex items-center gap-4 p-3">
      <Skeleton width="3.5rem" height="4.5rem" borderRadius="0.5rem" />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height="1rem" />
        <Skeleton width="40%" height="0.75rem" />
      </div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8" role="status" aria-label="Loading page">
    <Skeleton width="320px" height="4rem" borderRadius="0.5rem" />
    <Skeleton width="240px" height="1.5rem" />
    <div className="flex gap-4 mt-4">
      <Skeleton width="180px" height="3rem" borderRadius="0.75rem" />
      <Skeleton width="180px" height="3rem" borderRadius="0.75rem" />
    </div>
  </div>
);

export default Skeleton;
