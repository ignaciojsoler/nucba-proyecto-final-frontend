import ContentLoader from "react-content-loader";

const ServiceDetailSkeleton = () => {
  return (
    <div className="animate-sladeInFromBottomShort w-full">
      <ContentLoader
        speed={2}
        height={300}
        width="100%"
        backgroundColor="rgb(30 41 59)"
        foregroundColor="rgb(51 65 85)"
      >
        <rect y="0" width="500" height="15" />
        <rect y="50" rx="2" ry="2" width="340" height="10" />
        <rect y="100" rx="2" ry="2" width="150" height="10" />
        <rect x="180" y="100" rx="2" ry="2" width="150" height="10" />
        <rect y="150" rx="2" ry="2" width="340" height="10" />
      </ContentLoader>
    </div>
  )
}

export default ServiceDetailSkeleton