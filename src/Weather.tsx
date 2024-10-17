type Props = {
    temp: number
    description: string
};


export const Weather = ({temp,description}: Props) => {
    return (
        <div className="weather">
            <p>Temperature: {temp} </p>
            <p>Weather: {description}</p>
        </div>

    );
};