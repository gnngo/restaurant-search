import './card.styles.css';

const Card = ({restaurant: {id, name, website, phone}}) => {
    return (
        <div className='card-container' key={id}>
            <h2> {name} </h2>
            <p> {website} </p>
            <p> {phone} </p>
        </div>
    )
}

export default Card;


