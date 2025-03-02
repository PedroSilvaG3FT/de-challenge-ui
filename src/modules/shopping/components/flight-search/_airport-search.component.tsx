import AppFormAutoComplete, {
  IAppFormAutoCompleteProps,
} from "@/modules/@shared/components/form/form-autocomplete";

interface IProps extends Omit<IAppFormAutoCompleteProps, "suggestions"> {
  containerClassName?: string;
}
export default function AirportSearchComponent(props: IProps) {
  const suggestions = [
    { id: "1", title: "New York" },
    { id: "2", title: "Los Angeles" },
    { id: "3", title: "Chicago" },
    { id: "4", title: "San Francisco" },
    { id: "5", title: "Miami" },
    { id: "6", title: "Boston" },
  ];

  return (
    <section className={props.containerClassName}>
      <AppFormAutoComplete
        {...props}
        suggestions={suggestions}
        className="bg-transparent border-none"
        bindKey="title"
        renderItem={(item: any) => (
          <div>
            <strong>{item.id}</strong>
            <span className="text-gray-500 ml-2">{item.title}</span>
          </div>
        )}
      />
    </section>
  );
}
