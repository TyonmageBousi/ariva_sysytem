export type TitleInfo = {
    title: string;
    subtitle: string;
    description: string;
};

type Props = {
    main_title: TitleInfo;
};

export default function Product({ main_title }: Props) {
    return (
        <div>
            <p className="text-center  font-bold text-[clamp(2rem,_5vw,_4rem)]">{main_title.title}</p>
            <p className="text-center text-[clamp(1rem,_5vw,_2rem)] my-4">{main_title.subtitle}</p>
            <p className="text-center text-[clamp(1rem,_5vw,_1.5rem)] my-4">{main_title.description}</p>
        </div>
    );
}