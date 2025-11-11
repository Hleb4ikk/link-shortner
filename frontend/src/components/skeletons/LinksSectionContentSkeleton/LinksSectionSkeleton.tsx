import LinkCardSkeleton from '../LinkCardSkeleton/LinkCardSkeleton';

export default function LinksSectionContentSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <LinkCardSkeleton key={index} />
      ))}
    </>
  );
}
