export const ErrorHandler = ({ error }: { error: unknown }) => {
  return (
    <div className="text-center py-6">
      <p className="text-gray-600 dark:text-gray-300">
        {error?.message ?? "Something went wrong"}
      </p>
    </div>
  );
};
