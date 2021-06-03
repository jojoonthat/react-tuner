const Meter = (props => {
    const stickRotation = {
        transform: `rotate(${props.cents*1.8}deg)`
        // transform: `rotate(0deg)`
    }
    return (
        <div className='meter'>
            <div id='low-text'>low</div>
            <div className='meter-container'>
                <div className='stick' style={stickRotation}></div>
                <div id='circle'></div>
            </div>
            <div id='high-text'>high</div>
        </div>
    )
}
)

export default Meter;


