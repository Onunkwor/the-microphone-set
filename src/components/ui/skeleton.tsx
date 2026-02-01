import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]",
        className
      )}
      style={{
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
};

// Card skeleton for playlists, recommendations
export const CardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
    <Skeleton className="aspect-square w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  </div>
);

// Article skeleton for blog posts
export const ArticleSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
    <Skeleton className="h-52 w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex justify-between pt-4 border-t border-gray-100">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  </div>
);

// Interview skeleton with larger image
export const InterviewSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
    <Skeleton className="h-64 w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
);

// Featured interview skeleton (larger)
export const FeaturedInterviewSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div className="relative">
      <Skeleton className="aspect-[4/5] rounded-3xl" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-6 w-32 rounded-full" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-6 pt-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-12 w-48 rounded-full mt-4" />
    </div>
  </div>
);

// Recommendation skeleton with rank badge
export const RecommendationSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm relative">
    <div className="absolute top-4 right-4 z-10">
      <Skeleton className="w-12 h-12 rounded-full" />
    </div>
    <Skeleton className="aspect-square w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="bg-gray-50 rounded-xl p-4 mt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mt-2" />
      </div>
      <Skeleton className="h-10 w-full rounded-full mt-4" />
    </div>
  </div>
);

// Page loading skeleton with hero section
export const PageLoadingSkeleton = ({ title }: { title: string }) => (
  <div className="bg-white text-gray-900 min-h-screen">
    {/* Hero skeleton */}
    <section className="relative py-24 lg:py-32 px-6 md:px-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[150px]" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl space-y-6">
          <Skeleton className="h-10 w-48 rounded-full" />
          <Skeleton className="h-16 w-full max-w-lg" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-full max-w-md" />
        </div>
      </div>
    </section>

    {/* Content skeleton */}
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-64 mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Shimmer animation */}
    <style>{`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

// Grid skeleton for any page
export const GridSkeleton = ({
  count = 6,
  variant = "card"
}: {
  count?: number;
  variant?: "card" | "article" | "interview" | "recommendation"
}) => {
  const SkeletonComponent = {
    card: CardSkeleton,
    article: ArticleSkeleton,
    interview: InterviewSkeleton,
    recommendation: RecommendationSkeleton,
  }[variant];

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
};

export default Skeleton;
