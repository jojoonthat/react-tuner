const Meter = (props => {
    const isOnPitch = props.cents < 5 && props.cents > -5
    const stickRotation = {
        transform: `rotate(${props.cents * 1.8}deg)`,
        backgroundColor: isOnPitch ? 'rgb(143, 188, 143)' : 'rgb(240, 197, 197)'
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


