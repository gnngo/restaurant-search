import './card.styles.css';

const Card = ({restaurant: {resID, Name}}) => {
    return (
        <div className='card-container' key={resID}>
            <h2> {Name} </h2>
        </div>
    )
}

export default Card;
