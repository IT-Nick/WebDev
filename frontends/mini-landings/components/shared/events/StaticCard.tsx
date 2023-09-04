type StaticCardProps = {
    content: string;
    onClickMore: () => void;
  };
  
  const StaticCard: React.FC<StaticCardProps> = ({ content, onClickMore }) => {
    return (
      <div className="bg-white w-96 h-96 mt-4 mb-4 ml-4 mr-4 rounded-lg shadow-md h-full relative">
        <div>{content}</div>
        <button
          onClick={onClickMore}
          className="absolute bottom-2 left-2 bg-blue-500 text-white p-2 rounded"
        >
          Подробнее
        </button>
      </div>
    );
  };
  
  export default StaticCard;
  