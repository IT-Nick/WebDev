type CardInfo = {
    image: string;
    title: string;
    description: string;
  };

type StaticCardProps = {
    cardInfo: CardInfo;
    onClickMore: () => void;
  };
  
  const StaticCard: React.FC<StaticCardProps> = ({ cardInfo, onClickMore }) => {
    return (
        <div className="bg-white w-96 h-96 mt-4 mb-4 ml-4 mr-4 rounded-lg shadow-md h-full relative">
        <div className="h-1/3">
          <img src={cardInfo.image} alt={cardInfo.title} className="object-cover h-full w-full rounded-t-lg" />
        </div>
        <div className="h-1/3 flex justify-center items-center">
          <h2>{cardInfo.title}</h2>
        </div>
        <div className="h-1/3 flex justify-center items-center">
          <p>{cardInfo.description}</p>
        </div>
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
  