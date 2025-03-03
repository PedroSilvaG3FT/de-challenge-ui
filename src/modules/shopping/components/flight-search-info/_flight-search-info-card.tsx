import { IFlightCardInfo } from "../../interface/flight-card-info.interface";

interface IProps {
  data: IFlightCardInfo;
}
export default function FlightSearchInfoCardComponent(props: IProps) {
  const { data } = props;

  return (
    <article
      className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${data.bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-opacity duration-300"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-6">
        <data.icon className="w-12 h-12 mb-4 text-white" />
        <h3 className="text-2xl font-bold mb-2">{data.title}</h3>
        <p className="text-sm opacity-80">{data.description}</p>
      </div>
    </article>
  );
}
