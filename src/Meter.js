const Meter = (props => {
    const isOnPitch = props.cents < 15 && props.cents > -15
    const stickRotation = {
        transform: `rotate(${props.cents}deg)`,
        backgroundColor: isOnPitch ? 'rgb(144, 214, 155)' : 'rgb(252, 249, 246, 0.527)'
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


